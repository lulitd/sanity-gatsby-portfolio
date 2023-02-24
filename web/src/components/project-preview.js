import { Link } from "gatsby";
import React from "react";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockText from "./block-text";
import { Styled, Grid, Card, Box, Heading,Text} from "theme-ui";
import { lighten, darken,alpha} from "@theme-ui/color";
import ThemedLink from "./ThemedLink";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { useThemeUI } from "theme-ui";

function ProjectPreview(props) {
  const hasBG = (props.thumbImage && props.thumbImage.asset) || (props.mainImage && props.mainImage.asset);
  let bgURL;
  if (props.bgURL) bgURL = props.bgURL; 
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
      to={`/project/${props.slug.current}`}
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
          color: "secondary",
          fontFamily: "heading",
          letterSpacing: "0.25rem",
          borderColor: "secondary700",
          alignItems: "left",
          justifyContent: "flex-end",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          minHeight: "200px", 
          background: (t) => `
            linear-gradient(
              90deg,
              ${alpha('background', 1)(t)} 0%,
              ${alpha('background', 0.7)(t)} 70%,
              ${alpha('secondary', 0.0)(t)} 100%
            ),
            url(${bgURL})
          `,
          backgroundSize: "cover",
          transition: "0.5s",
          opacity:0.5, 
          ":hover": {
            color: "background",
            borderRadius: "0",
            borderTopLeftRadius: "default",
            borderBottomRightRadius: "default",
            borderStyle: "solid",
            borderColor: "primary",
            background: (t) => `
            linear-gradient(
              90deg,
              ${alpha('background', 1)(t)} 0%,
              ${alpha('background', 0.7)(t)} 40%,
              ${alpha('secondary', 0.0)(t)} 100%
            ),
            url(${bgURL})`,
            bg: "background",
            backgroundSize: "cover",
            opacity:1, 
            "& h3": {
              color: "primary",
            },
          },
        }}
        py={2}
        px={3}
      >
        <Box sx={{
          maxWidth: ["75%"],
        }}>
          <Heading
            sx={{
              color: "secondary500",
              textTransform: "uppercase",
              fontSize:[5,5,6],
            }}
            as="h3"
          >
            {props.title}
          </Heading>
          <Box sx={{
            overflow:"hidden",
          }}>
          {props.subtitle && (
            <Text
              sx={{
                color: "primary100",
                textTransform: "uppercase",
                letterSpacing: "0",
                lineHeight:'body',
                fontFamily: 'body',
                fontSize:[1,2],
                fontWeight:"lighter",
              }}
              as="p"
            >
              {props.subtitle }
            </Text>
          )}
          {/* {props.categories && (
            <Text
              sx={{
                color: "primary100",
                textTransform: "uppercase",
                letterSpacing: "0.1rem",
                fontFamily: 'body',
              }}
              fontSize={[3, 2, 3]}
              fontWeight="lighter"
              as="p"
            >
              {cat}
            </Text>
          )} */}
          </Box>
        </Box>
      </Card>
    </ThemedLink>
  );
}

export default ProjectPreview;
