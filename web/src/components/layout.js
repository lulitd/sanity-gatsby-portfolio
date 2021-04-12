import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Flex, Box } from "rebass";

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

const Layout = ({
  children,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  author,
  mainStyle,
  ...rest
}) => (

  
  <Flex flexDirection="column" minHeight="100vh" {...rest} sx={{}}>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <Box
      sx={{
        width: "100%",
        flex: "1 1 auto",
        px: [3, 2, 1],
        ...mainStyle,
      }}
      as="main"
    >
      <Box pt={64}>{children}</Box>
    </Box>
    <Footer author={author} />
  </Flex>
);

export default Layout;
