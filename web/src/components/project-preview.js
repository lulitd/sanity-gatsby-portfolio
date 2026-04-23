import React from "react";
import { Grid, Box, Heading, Text, Flex, Paragraph } from "theme-ui";
import ThemedLink from "./ThemedLink";
import SanityImage from "gatsby-plugin-sanity-image";

function ProjectPreview(props) {
  const img = props.thumbImage ?? props.mainImage ?? null;

  const cats =
    props.categories &&
    props.categories.length > 0 &&
    props.categories
      .slice(0, 3)
      .map((cat) => cat.title)
      .join(" - ");

  const roles =
    props.roles &&
    props.roles.length > 0 &&
    props.roles.flatMap((role) => Object.values(role).filter(Boolean)).join(" | ");

  return (
    <Grid columns={[1, 2, 2]} gap={[1, 2, 3]} sx={{ minHeight: "50vh", minHeight: "50svh" }}>
      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          p: [2, 3, 3],
          mb: 3,
        }}
      >
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
          {roles && (
            <Text
              as="p"
              sx={{
                fontFamily: "nav",
                textTransform: "uppercase",
                color: "secondary",
                textWrapStyle: "pretty",
              }}
            >
              {roles}
            </Text>
          )}
          {cats && (
            <Text
              sx={{
                fontFamily: "nav",
                textTransform: "uppercase",
                textWrapStyle: "pretty",
                opacity: 0.7,
              }}
            >
              {cats}
            </Text>
          )}
        </Box>
        <Box
          sx={{
            textWrapStyle: "pretty",
            my: 3,
          }}
        >
          {(props.excerpt || props.subtitle) && (
            <Paragraph>{props.excerpt ? props.excerpt : props.subtitle}</Paragraph>
          )}
        </Box>
        <Box
          sx={{
            my: 2,
          }}
        >
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
