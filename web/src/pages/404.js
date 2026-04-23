import React from "react";
import { SEO } from "../components/seo";
import Container from "../components/container";
import { Heading, Flex, Paragraph } from "theme-ui";
import ThemedLink from "../components/ThemedLink";

const NotFoundPage = () => (
  <Container>
    <Flex sx={{ flexDirection: "column", alignItems: "center" }}>
      <Heading>//Lost in the network</Heading>
      <Paragraph py="2">It looks like we can't find the page you were looking for... </Paragraph>
      <ThemedLink to="/" variant="fillBtn" sx={{ my: 4 }}>
        Back Home
      </ThemedLink>
    </Flex>
  </Container>
);

export default NotFoundPage;

export const Head = () => <SEO title="404" />;
