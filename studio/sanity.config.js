import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas/schema";
import deskStructure from "./deskStructure";
import { media } from "sanity-plugin-media";
import { dashboardTool } from "@sanity/dashboard";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";
import { muxInput } from "sanity-plugin-mux-input";

export default defineConfig({
  name: "default",
  title: "Sanity Gatsby Portfolio",
  projectId: "13zu9heh",
  dataset: "production",
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
    media(),
    muxInput({ mp4_support: "standard" }),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: "My Netlify deploys",
          sites: [
            {
              title: "Sanity Studio",
              apiId: "ce712ad5-9f8d-4291-be2a-8b7e68109039",
              buildHookId: "5e2245e5915f40736c05a0ab",
              name: "sanity-gatsby-portfolio-studio-wfyaia8f",
            },
            {
              title: "Portfolio Website",
              apiId: "7b1fd26c-9a69-488c-9d56-3c374831686e",
              buildHookId: "5e2245e5c1f514d0e5ad53cb",
              name: "sanity-gatsby-portfolio-web-kcxetz8b",
            },
          ],
        }),
      ],
    }),
  ],
  tools: (prev) => {
    // 👇 Uses environment variables set by Vite in development mode
    // if (import.meta.env.DEV) {
    //   return prev
    // }
    return prev.filter((tool) => tool.name !== "vision");
  },
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
