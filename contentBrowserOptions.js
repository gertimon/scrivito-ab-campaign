export const contentBrowserOptions = {
  campaigns: {
    title: "Campaigns",
    icon: "",
    field: "_objClass",
    operator: "equals",
    options: {
      abcampaign: {
        title: "A/B Campaign",
        value: "ABCampaign",
      },
      abtest: {
        title: "A/B Test",
        value: "ABTest",
      }
    }
  }
};
