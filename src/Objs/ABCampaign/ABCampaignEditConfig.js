import * as Scrivito from "scrivito";

Scrivito.provideEditingConfig("ABCampaign", {
  attributes: {
    validFrom: {
      title: "Valid From",
      description: "A date a campaign is valid. If empty, it is valid everytime.",
    },
    validUntil: {
      title: "Valid From",
      description: "A date a campaign is valid. If empty, it is valid everytime.",
    },
    trackingInformation: {
      title: "Tracking Information",
      description: "Enter additional information needed for your Tracking service.",
    },
  },
  properties: ["title", "description", "tags", "validFrom", "validUntil", "trackingInformation", "tests"],
});
