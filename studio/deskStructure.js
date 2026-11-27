import { MdPerson, MdSettingsSuggest } from "react-icons/md";

const singletonTypes = ["siteSettings", "aboutPage"];

const listedDocTypes = ["project", "person", "category", "accolade"];

const hiddenDocTypes = (listItem) =>
  ![...singletonTypes, ...listedDocTypes].includes(listItem.getId());

export default (S) =>
  S.list()
    .title("Content")
    .items([
      // ----------------------------------------
      // SINGLETONS
      // ----------------------------------------
      S.listItem()
        .title("Settings")
        .id("siteSettings")
        .icon(MdSettingsSuggest)
        .child(S.editor().id("siteSettings").schemaType("siteSettings").documentId("siteSettings")),

      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .icon(MdPerson)
        .child(S.editor().id("aboutPage").schemaType("aboutPage").documentId("aboutPage")),

      S.divider(),

      // ----------------------------------------
      // CONTENT COLLECTIONS
      // ----------------------------------------
      S.listItem()
        .title("Projects")
        .schemaType("project")
        .child(S.documentTypeList("project").title("Projects")),

      S.listItem()
        .title("People")
        .schemaType("person")
        .child(S.documentTypeList("person").title("People")),

      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),

      S.listItem()
        .title("Accolades")
        .schemaType("accolade")
        .child(S.documentTypeList("accolade").title("Accolades")),

      // ----------------------------------------
      // REMAINING DOCUMENT TYPES
      // ----------------------------------------
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
