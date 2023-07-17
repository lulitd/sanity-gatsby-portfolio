import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Flex, Box } from "theme-ui";

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]');
}

const Layout = ({
  children,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  author,
  authorStatus,
  mainStyle,
  ...rest
}) => (
  <Flex
    {...rest}
    sx={{
      flexDirection: "column",
      minHeight: "100vh",
      minHeight: "100svh",
      justifyContent: "space-between"
    }}
  >
    <Header
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
      status={authorStatus}
    />
    <Flex
      sx={{
        width: "100%",
        flex: "1 1 auto",
        flexDirection: "column",
        px: [0]
      }}
      as="main"
    >
      {children}
    </Flex>
    <Footer author={author} status={authorStatus} />
  </Flex>
);

export default Layout;
