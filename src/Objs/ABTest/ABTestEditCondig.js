import * as Scrivito from "scrivito";

Scrivito.provideEditingConfig("ABTest", {
  attributes: {
    tags: {
      title: "Tags",
    },
    title: {
      title: "Titel",
    },
    targetingrules: {
      title: "Targetingrules"
    },
    description: {
      title: "Description",
    },
  },
  properties: ["title", "description", "tags", "targetingrules"],
});
