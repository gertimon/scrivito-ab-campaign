import * as Scrivito from "scrivito";

Scrivito.provideEditingConfig("ABCampaign", {
  attributes: {
    tags: {
      title: "Tags",
    },
    title: {
      title: "Titel",
    },
    description: {
      title: "Description",
    },
    tests: {
      title: "Tests",
    },
  },
  properties: ["title", "description", "tags", "tests"],
});
