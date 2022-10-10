import React from "react";
// import Layout from "../containers/layout";
import SEO from "../components/seo";
import Container from "../components/container";
import { Styled,Heading} from "theme-ui";
import ThemedLink from "../components/ThemedLink";

const NotFoundPage = () => (
  <>
    <SEO title="Whoops!" />
    <Container>
      <Heading variant="text.barcodes">//Lost in the network</Heading>
      <Styled.p>We can't find the page that you're looking for...</Styled.p>

      <ThemedLink block my={2} to="/" variant="outlineBtn" fontSize={2}>
        Back Home
      </ThemedLink>
    </Container>
  </>
);

export default NotFoundPage;
