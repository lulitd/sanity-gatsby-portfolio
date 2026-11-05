import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { media } from "sanity-plugin-media";

import schemas from "./schemas/schema";
import deskStructure from "./deskStructure";

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
    codeInput(),
  ],

  schema: {
    types: schemas,
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((item) => item.templateId !== "siteSettings");
      }
      return prev;
    },

    actions: (prev, { schemaType }) => {
      if (schemaType === "siteSettings") {
        return prev.filter(({ action }) => !["unpublish", "delete", "duplicate"].includes(action));
      }
      return prev;
    },
  },
});
