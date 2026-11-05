import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { codeInput } from "@sanity/code-input";
import schemas from "./schemas/schema";
import deskStructure from "./deskStructure";
import { media } from "sanity-plugin-media";

export default defineConfig({
  name: "default",
  title: "Sanity Gatsby Portfolio",
  projectId: "13zu9heh",
  dataset: "production",
  plugins: [
    deskTool({
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
        return prev.filter((templateItem) => templateItem.templateId != "settings");
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === "settings") {
        return prev.filter(({ action }) => !["unpublish", "delete", "duplicate"].includes(action));
      }
      return prev;
    },
  },
});
