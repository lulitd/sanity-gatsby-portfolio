/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from "react";
import LayoutContainer from "./src/containers/layoutContainer";

export const wrapPageElement = ({ element, props }) => {
  return <LayoutContainer {...props}>{element}</LayoutContainer>;
};

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link key="google-fonts-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      key="google-fonts-static-preconnect"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="google-fonts-stylesheet"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
    />,
  ]);
};
