import React from "react";
import { Global } from "@emotion/react";

export default (props) => (
  <Global
    styles={(theme) => ({
      html: {
        scrollbarGutter: "stable",
      },

      "@media (max-width: 639px)": {
        "html.nav-open, body.nav-open": {
          overflow: "hidden",
        },
      },

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
      ".gmap-secondary-primary": {
        filter: "url(/gradient-maps.svg#gmap_secondary_primary)",
      },
    })}
  />
);
