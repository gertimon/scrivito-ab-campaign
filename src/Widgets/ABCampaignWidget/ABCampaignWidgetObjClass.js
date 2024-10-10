import * as Scrivito from "scrivito";

Scrivito.provideWidgetClass("ABCampaignWidget", {
  attributes: {
    campaign: ["reference", { only: ["ABCampaign"] }],
  },
});
