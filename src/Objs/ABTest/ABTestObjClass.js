import * as Scrivito from "scrivito";

Scrivito.provideObjClass("ABTest", {
  attributes: {
    title: "string",
    description: "string",
    tags: "stringlist",
    targetingrules: "stringlist",
    content: "widgetlist",
  }
});
