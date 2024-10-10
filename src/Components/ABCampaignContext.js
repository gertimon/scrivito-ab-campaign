import React, { createContext, useContext, useRef } from 'react';

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

export const CampaignProvider = ({ children, chooseTestGroup }) => {
  const selectedCampaigns = useRef(JSON.parse(window.localStorage.getItem("abcampaign")) || {});

  const chooseRandomeCampaignFor = (campaignTitle, tests) => {
    const test = chooseTestGroup ? chooseTestGroup(campaignTitle, tests) : randomlyChooseGroup(tests);
    selectedCampaigns.current[campaignTitle] = test;
    window.localStorage.setItem("abcampaign", JSON.stringify(selectedCampaigns.current));
    return test;
  };

  return (
    <CampaignContext.Provider value={{ selectedCampaigns: selectedCampaigns.current, chooseRandomeCampaignFor }}>
      {children}
    </CampaignContext.Provider>
  );
};
