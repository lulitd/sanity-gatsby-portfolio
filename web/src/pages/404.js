import React from "react";
import Layout from "../containers/layout";
import SEO from "../components/seo";
import Container from "../components/container";
import { Styled } from "theme-ui";
import ThemedLink from "../components/ThemedLink";

const NotFoundPage = () => (
  <Layout>
    <SEO title="Whoops!" />
    <Container>
      <Styled.h1>Oh no! Something went wrong!</Styled.h1>
      <Styled.p>We can't find the page that you're looking for...</Styled.p>

      <ThemedLink block="true" my={2} to="/" variant="outlineBtn" fontSize={2}>
        Back Home
      </ThemedLink>
    </Container>
  </Layout>
);

export default NotFoundPage;
