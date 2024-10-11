import React, { createContext, useContext, useRef } from 'react';
import * as Scrivito from "./scrivito";

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

  const chooseRandomeCampaignFor = (campaignTitle, tests) => {
    const test = chooseTestGroup ? chooseTestGroup(campaignTitle, tests) : randomlyChooseGroup(tests);
    selectedCampaigns.current[campaignTitle] = test;
    window.localStorage.setItem("abcampaign", JSON.stringify(selectedCampaigns.current));
    return test;
  };

  const trackInteractionFor = async (campaign) => {
    if(!trackInteraction) return null;
    const campaignTitle = campaign.get("Title");
    const tests = await Scrivito.load(() => campaign.get(tests));
    const group = selectedCampaigns[campaignTitle] || chooseRandomeCampaignFor(campaign, tests);
    const selectedTest = tests.filter((t) => t.get("title") === group);
    return trackInteraction(campaign, selectedTest);
  }

  return (
    <CampaignContext.Provider value={{ selectedCampaigns: selectedCampaigns.current, chooseRandomeCampaignFor, trackInteractionFor }}>
      {children}
    </CampaignContext.Provider>
  );
};
