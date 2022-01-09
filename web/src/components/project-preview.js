import { Link } from "gatsby";
import React from "react";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockText from "./block-text";
import { Styled, Grid, jsx, Card, Box } from "theme-ui";
import { lighten, alpha } from "@theme-ui/color";
import { Heading } from "rebass";
import ThemedLink from "./ThemedLink";

import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { useThemeUI } from "theme-ui";
//@jsx jsx
function ProjectPreview(props) {
  const hasBG = (props.thumbImage && props.thumbImage.asset) || (props.mainImage && props.mainImage.asset);
  let bgURL;

  const cat = props.categories && props.categories.slice(0, 3).map(x => x.title).join(" + ");  

  const isFull= props.isFull;

  // image settings using sanity to resize and frame images for thumbnails. 
  const xAspect =isFull?50:25; // take into account the aspect ratio of the image thumbail. 
  const yApsect =9; 
  if (hasBG) {
    bgURL = imageUrlFor(buildImageObj(props.thumbImage ? props.thumbImage : props.mainImage))
      .width(1200)
      .height(Math.floor((yApsect/ xAspect) * 1200))
      .blur(10)
      .fit("crop")
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
          borderWidth: 1,
          borderStyle: "solid",
          color: "primary",
          fontFamily: "heading",
          letterSpacing: "0.25rem",
          borderColor: "inherit",
          alignItems: "left",
          justifyContent: "flex-end",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          minHeight: "200px",
          background: `linear-gradient(90deg, rgba(2,0,36,1) 0%,rgba(2,0,36,0.6) 40%,rgba(9,9,121,0) 100%),  url(${bgURL})`,
          backgroundSize: "cover",
          transition: "0.5s",
          "& h2,h3": {
            opacity: 1,
          },
          ":hover": {
            color: "background",
            borderRadius: "0",
            borderTopLeftRadius: "default",
            borderBottomRightRadius: "default",
            borderStyle: "solid",
            borderColor: "secondary",
            background: `linear-gradient(90deg, rgba(2,0,36,1) 0%,rgba(2,0,36,0.6) 40%,rgba(9,9,121,0) 100%), url(${bgURL})`,
            bg: "background",
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
        <Box sx={{
          maxWidth: ["22ch","22ch","30ch"]
        }}>
          <Heading
            sx={{
              color: lighten("primary", 0.3),
              textTransform: "uppercase",
            }}
            fontSize={[4, 5]}
          >
            {props.title}
          </Heading>


          {props.categories && (
            <Heading
              sx={{
                color: lighten("primary", 0.1),
                textTransform: "uppercase",
                letterSpacing: "0.1rem",
                fontFamily: 'body',
              }}
              fontSize={[3, 2, 3]}
              fontWeight="lighter"
            >
              {cat}
            </Heading>
          )}
        </Box>
      </Card>
    </ThemedLink>
  );
}

export default ProjectPreview;
