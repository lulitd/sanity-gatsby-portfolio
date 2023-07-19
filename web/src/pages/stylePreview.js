import React from "react";
import Layout from "../containers/layout";
import { SEO } from "../components/seo";
import Container from "../components/container";
import { Heading, Flex, Button, Box, Card, Grid } from "theme-ui";
import { Themed } from "@theme-ui/mdx";
import ThemedLink from "../components/ThemedLink";
import Icon from "../components/icon";
import ProjectPreview from "../components/project-preview";

const placeHolderProject = {
  slug: {
    current: "",
  },
  title: "Test Title",
  subtitle: " This is a subtitle. It can be a bit long.",
  categories: [{ title: "Category A" }, { title: "Category B" }, { title: "Category C" }],
  bgURL: "../code_bg-med.jpg",
};
const StylePreviewPage = () => (
  <Layout>
    <Container>
      <Heading>Colors</Heading>
      <Grid columns={5} gap={1} rows="3">
        <Box p={2} color="background" bg="primary100">
          Primary100
        </Box>
        <Box p={2} color="background" bg="primary300">
          Primary300
        </Box>
        <Box p={2} color="background" bg="primary500">
          Primary500
        </Box>
        <Box p={2} color="background" bg="primary700">
          Primary700
        </Box>
        <Box p={2} color="text" bg="primary900">
          Primary900
        </Box>

        <Box p={2} color="background" bg="secondary100">
          secondary100
        </Box>
        <Box p={2} color="background" bg="secondary300">
          secondary300
        </Box>
        <Box p={2} color="background" bg="secondary500">
          secondary500
        </Box>
        <Box p={2} color="background" bg="secondary700">
          secondary700
        </Box>
        <Box p={2} color="text" bg="secondary900">
          secondary900
        </Box>

        <Box p={2} color="background" bg="third100">
          third100
        </Box>
        <Box p={2} color="background" bg="third300">
          third300
        </Box>
        <Box p={2} color="background" bg="third500">
          third500
        </Box>
        <Box p={2} color="background" bg="third700">
          third700
        </Box>
        <Box p={2} color="text" bg="third900">
          third900
        </Box>
      </Grid>
    </Container>

    <Container>
      <Heading variant="title">Typeography: Title</Heading>
      <Heading variant="heading">Default heading</Heading>
      <Heading variant="subheading">Subheading</Heading>
      <Heading variant="brackets">Brackets variant</Heading>
      <Heading variant="barcodes">Barcodes variant</Heading>
      <Themed.h1>H1 Heading</Themed.h1>
      <Themed.p>
        Hi, I'm Lalaine. Based in Toronto, Canada, I've been described as a jack-of-all-trades. I am
        a new media artist and software developer, but I am a storyteller at heart. I develop
        software that tells compelling stories <Themed.a>and spark curiosity</Themed.a> across many
        mediums and platforms.{" "}
      </Themed.p>
      <Themed.h2>H2 Heading</Themed.h2>
      <Themed.p>
        Hi, I'm Lalaine. Based in Toronto, Canada, I've been described as a jack-of-all-trades. I am
        a new media artist and software developer, but I am a storyteller at heart. I develop
        software that tells compelling stories and spark curiosity across many mediums and
        platforms.{" "}
      </Themed.p>
      <Themed.h3>H3 Heading</Themed.h3>
      <Themed.p>
        Hi, I'm Lalaine. Based in Toronto, Canada, I've been described as a jack-of-all-trades. I am
        a new media artist and software developer, but I am a storyteller at heart. I develop
        software that tells compelling stories and spark curiosity across many mediums and
        platforms.{" "}
      </Themed.p>
      <Themed.h4>H4 Heading</Themed.h4>
      <Themed.p>
        Hi, I'm Lalaine. Based in Toronto, Canada, I've been described as a jack-of-all-trades. I am
        a new media artist and software developer, but I am a storyteller at heart. I develop
        software that tells compelling stories and spark curiosity across many mediums and
        platforms.{" "}
      </Themed.p>
      <Themed.h5>H5 Heading</Themed.h5>
      <Themed.p>
        Hi, I'm Lalaine. Based in Toronto, Canada, I've been described as a jack-of-all-trades. I am
        a new media artist and software developer, but I am a storyteller at heart. I develop
        software that tells compelling stories and spark curiosity across many mediums and
        platforms.{" "}
      </Themed.p>
      <Themed.h6>H6 Heading</Themed.h6>
      <Themed.p>
        Hi, I'm Lalaine. Based in Toronto, Canada, I've been described as a jack-of-all-trades. I am
        a new media artist and software developer, but I am a storyteller at heart. I develop
        software that tells compelling stories and spark curiosity across many mediums and
        platforms.{" "}
      </Themed.p>
    </Container>
    <Container>
      <Heading>Buttons</Heading>

      <Box sx={{ my: 3 }}>
        <ThemedLink variant="nav">Navigation Button</ThemedLink>{" "}
      </Box>
      <Box sx={{ my: 3 }}>
        <ThemedLink variant="outlineBtn">Outline Button</ThemedLink>{" "}
      </Box>
      <Box sx={{ my: 3 }}>
        <ThemedLink variant="fillBtn">Semi Button</ThemedLink>
      </Box>
      <Box sx={{ my: 3 }}>
        <Button variant="socialBtn">
          {" "}
          <Icon symbol="github" />
        </Button>
      </Box>
    </Container>
  </Layout>
);

export default StylePreviewPage;

export const Head = () => <SEO title="Theme" />;
