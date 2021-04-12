import { Link } from "gatsby";
import React from "react";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockText from "./block-text";
import { Styled, Grid, jsx, Card } from "theme-ui";
import { lighten, alpha } from "@theme-ui/color";
import { Heading } from "rebass";
import ThemedLink from "./ThemedLink";

import { useThemeUI } from "theme-ui";
//@jsx jsx
function ProjectPreview(props) {
  const hasBG = props.mainImage && props.mainImage.asset;
  let bgURL;

  if (hasBG) {
    bgURL = imageUrlFor(buildImageObj(props.mainImage))
      .width(600)
      .height(Math.floor((9 / 16) * 600))
      .blur(15)
      .url();
  }

  const context = useThemeUI();
  const { colors } = context.theme;

  return (
    <ThemedLink
      block
      to={`/project/${props.slug.current}`}
      transitionColor={colors.primary}
      sx={{
        textDecoration: "none",
      }}
    >
      <Card
        sx={{
          borderRadius: "default",
          borderTopLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderWidth: 2,
          borderStyle: "solid",
          color: "primary",
          fontFamily: "heading",
          letterSpacing: "0.25rem",
          borderColor: "inherit",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          minHeight: "200px",
          background: `linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.5)), url(${bgURL})`,
          backgroundSize: "cover",
          opacity: "0.6",
          transition: "0.5s",
          "& h2,h3": {
            opacity: 1,
          },
          ":hover": {
            color: "background",
            borderRadius: "0",
            borderTopLeftRadius: "default",
            borderBottomRightRadius: "default",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "secondary",
            background: `linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.5)), url(${bgURL})`,
            bg: "background",
            opacity: 1,
            backgroundSize: "cover",

            "& h2,h3": {
              color: "secondary",
              opacity: 1,
            },
          },
        }}
        py={2}
        px={4}
      >
        <Heading
          sx={{
            color: lighten("primary", 0.3),
            textTransform: "uppercase",
          }}
          fontSize={[4, 5]}
        >
          {props.title}
        </Heading>
        {props.subtitle && (
          <Heading
            sx={{
              color: lighten("primary", 0.1),
              textTransform: "uppercase",
              letterSpacing: "0.1rem",
            }}
            fontSize={[3, 4]}
            fontWeight="normal"
          >
            {props.subtitle}
          </Heading>
        )}
      </Card>
    </ThemedLink>
  );
}

export default ProjectPreview;
