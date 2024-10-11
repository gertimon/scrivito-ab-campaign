import React, { createContext, useContext, useRef } from 'react';
import * as Scrivito from "scrivito";

import { campaignTitle } from "../utils/campaignTitle";

const CampaignContext = createContext();

const randomlyChooseGroup = (tests) => {
  const length = tests.length;
  const randomNumber = Math.floor(Math.random() * length);
  return tests[randomNumber].get("title");
}

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};

export const CampaignProvider = ({ children, chooseTestGroup, trackInteraction }) => {
  const selectedCampaigns = useRef(JSON.parse(window.localStorage.getItem("abcampaign")) || {});

  const chooseRandomeCampaignFor = (campaign) => {
    const cTitle = campaignTitle(campaign);
    const tests = campaign?.get("tests");
    if (!tests?.length) {return null;}
    const test = chooseTestGroup ? chooseTestGroup(campaign) : randomlyChooseGroup(tests);
    selectedCampaigns.current[cTitle] = test;
    window.localStorage.setItem("abcampaign", JSON.stringify(selectedCampaigns.current));
    return test;
  };

  const trackInteractionFor = async (campaign) => {
    if(!trackInteraction) return null;
    const cTitle = campaignTitle(campaign);
    const tests = await Scrivito.load(() => campaign.get(tests));
    const group = selectedCampaigns[cTitle] || chooseRandomeCampaignFor(campaign, tests);
    const selectedTest = tests.filter((t) => t.get("title") === group);
    return trackInteraction(campaign, selectedTest);
  }

  const actualCampaign = (widget) => {
    if (!widget) return null;
    const parent = widget.container();
    if (parent.objClass() === "ABCampaignWidget") return parent;
    actualCampaign(parent);
  }

  return (
    <CampaignContext.Provider value={{ selectedCampaigns: selectedCampaigns.current, chooseRandomeCampaignFor, trackInteractionFor }}>
      {children}
    </CampaignContext.Provider>
  );
};
