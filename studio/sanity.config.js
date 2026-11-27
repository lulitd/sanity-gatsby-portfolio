import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";

import schemas from "./schemas/schema";
import deskStructure from "./deskStructure";

// ----------------------------------------
// SINGLETON CONFIGURATION
// ----------------------------------------
const singletonTypes = new Set(["siteSettings", "aboutPage"]);

const restrictedActions = ["unpublish", "delete", "duplicate"];

export default defineConfig({
  name: "default",
  title: "Sanity Gatsby Portfolio",
  projectId: "13zu9heh",
  dataset: "production",

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    media(),
  ],

  schema: {
    types: schemas,
  },

  document: {
    // ----------------------------------------
    // PREVENT CREATING EXTRA SINGLETONS
    // ----------------------------------------
    newDocumentOptions: (prev) => {
      return prev.filter((item) => !singletonTypes.has(item.templateId));
    },

    // ----------------------------------------
    // RESTRICT SINGLETON ACTIONS
    // ----------------------------------------
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({ action }) => !restrictedActions.includes(action));
      }

      return prev;
    },
  },
});
