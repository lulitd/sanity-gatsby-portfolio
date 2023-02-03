import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Flex, Box,jsx } from "theme-ui";
//@jsx jsx

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

  <Flex {...rest} sx={{
    flexDirection:"column",
    minHeight:"100vh"
  }}>
    {/* <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} /> */}
    <Flex
      sx={{
        width: "100%",
        flex: "1 1 auto",
        px: [0],
        flexDirection:"column",
        alignItems:"center",
      }}
      as="main"
    >
      <Box sx={{pt:90, width:"100%"}}>{children}</Box>
    </Flex>
    <Footer author={author} />
  </Flex>
);

export default Layout;
