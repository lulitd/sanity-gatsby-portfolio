import React from "react";
import { Global } from "@emotion/react";

export default (props) => (
  <Global
    styles={(theme) => ({
      "*": {
        scrollbarWidth: "thin",
        scrollbarColor: "#F29E1F #003450",
      },

      /* Works on Chrome, Edge, and Safari */
      "*::-webkit-scrollbar": {
        width: "0.5em",
      },

      "*::-webkit-scrollbar-track": {
        background: theme.colors.primary900,
      },

      "*::-webkit-scrollbar-thumb": {
        backgroundColor: theme.colors.primary,
      },

      "img[data-loading]": {
        position: "absolute",
        width: "10px !important",
        height: "10px !important",
        opacity: 0,
        zIndex: "-10",
        pointerEvents: "none",
        userSelect: "none",
      },
      ".overflow-y-none": {
        overflowY: "hidden",
      },
      ".gmap-primary": {
        filter: "url(/gradient-maps.svg#gmap_primary)",
      },
      ".gmap-secondary": {
        filter: "url(/gradient-maps.svg#gmap_secondary)",
      },
      ".gmap-third": {
        filter: "url(/gradient-maps.svg#gmap_third)",
      },
      ".gmap-primary-mono": {
        filter: "url(/gradient-maps.svg#gmap_primary_mono)",
      },
      ".gmap-secondary-mono": {
        filter: "url(/gradient-maps.svg#gmap_secondary_mono)",
      },
      ".gmap-third-mono": {
        filter: "url(/gradient-maps.svg#gmap_third_mono)",
      },
      ".gmap-primary-secondary": {
        filter: "url(/gradient-maps.svg#gmap_primary_secondary)",
      },
      ".gmap-primary-third": {
        filter: "url(/gradient-maps.svg#gmap_primary_third)",
      },
      ".gmap-secondary-primary": {
        filter: "url(/gradient-maps.svg#gmap_secondary_primary)",
      },
      ".gmap-secondary-third": {
        filter: "url(/gradient-maps.svg#gmap_secondary_third)",
      },
      ".gmap-third-primary": {
        filter: "url(/gradient-maps.svg#gmap_third_primary)",
      },
      ".gmap-third-secondary": {
        filter: "url(/gradient-maps.svg#gmap_third_secondary)",
      },
    })}
  />
);
