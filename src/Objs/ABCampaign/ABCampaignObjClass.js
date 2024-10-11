import * as Scrivito from "scrivito";

Scrivito.provideObjClass("ABCampaign", {
  attributes: {
    title: "string",
    description: "string",
    tags: "stringlist",
    tests: ["referencelist", { only: "ABTest" }],
    validFrom: "datetime",
    validUntil: "datetime",
    defaultContent: "widgetlist",
    trackingInformation: "string",
  }
});
