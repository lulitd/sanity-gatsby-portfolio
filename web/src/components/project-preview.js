import { Link } from "gatsby";
import React from "react";
import { cn, buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockText from "./block-text";
import { Styled, Grid, Card, Box, Heading, Text, Flex } from "theme-ui";
import { lighten, darken, alpha } from "@theme-ui/color";
import ThemedLink from "./ThemedLink";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { useThemeUI } from "theme-ui";
import SanityImage from "gatsby-plugin-sanity-image";
import { Themed } from "@theme-ui/mdx";

function ProjectPreview(props) {
  const img = props.thumbImage ?? props.mainImage ?? null;

  const context = useThemeUI();
  const { colors } = context.theme;

  const cats =
    props.categories &&
    props.categories.length > 0 &&
    props.categories
      .slice(0, 3)
      .map((cat) => cat.title)
      .join(" - ");
  return (
    <Grid columns={[1, 2, 2]} gap={[1, 2, 3]} sx={{ minHeight: "50vh", minHeight: "50svh" }}>
      <Flex sx={{ flexDirection: "column", justifyContent: "space-evenly", p: [2, 3, 3] }}>
        <Box>
          <Heading
            sx={{
              color: "primary500",
              letterSpacing: "0.125rem",
              fontSize: [5, 6, 7],
              mb: 1,
            }}
            as="h3"
          >
            {props.title}
          </Heading>
          {cats && (
            <Text
              sx={{
                fontFamily: "nav",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              {cats}
            </Text>
          )}
        </Box>
        <Box>
          {(props.excerpt || props.subtitle) && (
            <Themed.p
              sx={{
                color: "body",
                letterSpacing: "0",
                lineHeight: "body",
                fontFamily: "body",
                opacity: 1,
              }}
              as="p"
            >
              {props.excerpt ? props.excerpt : props.subtitle}
            </Themed.p>
          )}
        </Box>
        <Box>
          <ThemedLink variant="outlineBtn" to={`/project/${props.slug.current}`}>
            Learn More
          </ThemedLink>
        </Box>
      </Flex>
      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "space-around",
          gridRowStart: [1, "inherit", "inherit"],
        }}
      >
        <Box>
          <SanityImage
            {...img}
            width={800}
            sx={{
              color: "secondary900",
              filter: "drop-shadow(-5px 10px 10px currentColor)",
              maxWidth: "100%",
            }}
            alt={img ? img.asset.altText : ""}
          />
        </Box>
      </Flex>
    </Grid>
  );
}

export default ProjectPreview;
