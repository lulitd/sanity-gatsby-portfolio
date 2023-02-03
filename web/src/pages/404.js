import React from "react";
import Layout from "../containers/layout";
import {SEO} from "../components/seo";
import Container from "../components/container";
import {Heading,Flex} from "theme-ui";
import { Themed } from '@theme-ui/mdx';
import ThemedLink from "../components/ThemedLink";

const NotFoundPage = () => (
  <Layout>
    <Container>
      <Flex sx={{flexDirection:"column", alignItems:"center",}}>
      <Heading variant="text.barcodes">//Lost in the network</Heading>
      <Themed.p>It looks like we can't find the page you were looking for... </Themed.p>

      <ThemedLink to="/" variant="semiOutlineBtn" sx={{my:4}}>
        Back Home
      </ThemedLink>
      </Flex>
    </Container>
  </Layout>
);

export default NotFoundPage;

export const Head = () => (
  <SEO  title="404"/>
)
