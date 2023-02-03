import React from "react";
// import Layout from "../containers/layout";
import SEO from "../components/seo";
import Container from "../components/container";
import { Styled,Heading,Flex} from "theme-ui";
import ThemedLink from "../components/ThemedLink";

const NotFoundPage = () => (
  <>
    <SEO title="Whoops!" />
    <Container>
      <Flex sx={{flexDirection:"column", alignItems:"center",}}>
      <Heading variant="text.barcodes">//Lost in the network</Heading>
      <Styled.p>It looks like we can't find the page you were looking for... </Styled.p>

      <ThemedLink block to="/" variant="semiOutlineBtn" sx={{my:4}}>
        Back Home
      </ThemedLink>
      </Flex>
    </Container>
  </>
);

export default NotFoundPage;
