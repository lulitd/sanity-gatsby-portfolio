import { Link } from "gatsby";
import React from "react";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockText from "./block-text";
import { Styled, Grid, Card, Box, Heading, Text } from "theme-ui";
import { lighten, darken, alpha } from "@theme-ui/color";
import ThemedLink from "./ThemedLink";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { useThemeUI } from "theme-ui";

function ProjectPreview(props) {
  const hasBG =
    (props.thumbImage && props.thumbImage.asset) || (props.mainImage && props.mainImage.asset);
  let bgURL;
  if (props.bgURL) bgURL = props.bgURL;
  const cat =
    props.categories &&
    props.categories
      .slice(0, 3)
      .map(x => x.title)
      .join(" + ");

  const isFull = props.isFull;

  // image settings using sanity to resize and frame images for thumbnails.
  const xAspect = isFull ? 50 : 25; // take into account the aspect ratio of the image thumbail.
  const yApsect = 9;
  if (hasBG) {
    bgURL = imageUrlFor(buildImageObj(props.thumbImage ? props.thumbImage : props.mainImage))
      .width(1024)
      .height(Math.floor((yApsect / xAspect) * 1024))
      .blur(10)
      .fit("crop")
      .url();
  }

  const context = useThemeUI();
  const { colors } = context.theme;

  return (
    <ThemedLink
      to={`/project/${props.slug.current}`}
      sx={{
        textDecoration: "none"
      }}
    >
      <Box
        sx={{
          color: "secondary",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          minHeight: "12rem",
          justifyContent: "flex-end",
          p: 3,
          borderColor: "secondary700",
          borderWidth: 2,
          borderStyle: "solid",
          borderRadius: "0",
          overflow: "clip",
          transition: "border 0.25s",
          "&:hover": {
            borderRadius: "0",
            borderTopLeftRadius: "large",
            borderBottomRightRadius: "large",
            borderStyle: "solid",
            borderColor: "primary"
          },
          "&:hover .project-background": {
            filter: "url(/gradient-maps.svg#gmap_secondary_primary)",
            opacity: 0.5,
            transform: "scale(1.1)",
            transition: "opacity 1s, transform 1s ease-out"
          }
        }}
      >
        <Box
          className={"project-background"}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: "-9999",
            background: t => `
          linear-gradient(
            90deg,
            ${alpha("background", 1)(t)} 0%,
            ${alpha("background", 0.5)(t)} 70%,
            ${alpha("primary", 0.0)(t)} 100%
          ),
          url(${bgURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1)",
            opacity: 1,
            filter: "none",
            transition: "opacity 1s, transform 0.25s"
          }}
        />
        <Box
          className="project-labels"
          sx={{
            maxWidth: ["80%", "80%", "80%"],
            textAlign: "left"
          }}
        >
          <Heading
            sx={{
              color: "primary500",
              letterSpacing: "0.125rem",
              fontSize: [5, 5, 6],
              m: 0
            }}
            as="h2"
          >
            {props.title}
          </Heading>
          <Box
            sx={{
              overflow: "hidden"
            }}
          >
            {props.subtitle && (
              <Text
                sx={{
                  color: "primary100",
                  letterSpacing: "0",
                  textTransform: "capitalize",
                  lineHeight: "body",
                  fontFamily: "body"
                }}
                as="p"
              >
                {props.subtitle}
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </ThemedLink>
  );
}

export default ProjectPreview;
