import React from "react";
import Header from "./header";
import Footer from "./footer";
import { motion, AnimatePresence } from "framer-motion";
import { Flex } from "theme-ui";
import { useLocation } from "@reach/router";
import Container from "./container";

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
}) => {
  const location = useLocation();

  return (
    <Flex
      {...rest}
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
        minHeight: "100svh",
        justifyContent: "space-between",
      }}
    >
      <Header
        siteTitle={siteTitle}
        onHideNav={onHideNav}
        onShowNav={onShowNav}
        showNav={showNav}
        status={authorStatus}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <Flex
            sx={{
              width: "100%",
              flex: "1 1 auto",
              flexDirection: "column",
              px: [0],
              minHeight: "75vh",
            }}
            as="main"
          >
            {children}
          </Flex>
        </motion.div>
      </AnimatePresence>

      <Footer author={author} status={authorStatus} />
    </Flex>
  );
};

export default Layout;
