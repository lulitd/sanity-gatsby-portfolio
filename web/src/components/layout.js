import React, { useEffect, useRef } from "react";
import Header from "./header";
import Footer from "./footer";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Flex } from "theme-ui";
import { useLocation } from "@reach/router";

if (typeof window !== "undefined") {
  require("smooth-scroll")('a[href*="#"]');
}

// Match the project archive and category pages.
// Adjust "category" if your Gatsby routes use a different path.
const isProjectArchive = (pathname) => {
  const path = pathname.replace(/\/+$/, "") || "/";

  return path === "/projects" || /^\/projects\/category\/[^/]+$/.test(path);
};

const pageVariants = {
  initial: (custom) => ({
    opacity: 0,
    y: custom.isCategoryChange || custom.reduceMotion ? 0 : 12,
  }),

  animate: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.reduceMotion ? 0 : custom.isCategoryChange ? 0.25 : 0.4,
      ease: "easeOut",
    },
  }),

  exit: (custom) => ({
    opacity: 0,
    y: custom.isCategoryChange || custom.reduceMotion ? 0 : -10,
    transition: {
      duration: custom.reduceMotion ? 0 : custom.isCategoryChange ? 0.15 : 0.2,
      ease: "easeIn",
    },
  }),
};

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
  const shouldReduceMotion = useReducedMotion();

  const previousPath = useRef(location.pathname);

  const isCategoryChange =
    previousPath.current !== location.pathname &&
    isProjectArchive(previousPath.current) &&
    isProjectArchive(location.pathname);

  const transitionSettings = {
    isCategoryChange,
    reduceMotion: shouldReduceMotion,
  };

  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      onHideNav();
      previousPath.current = location.pathname;
    }
  }, [location.pathname, onHideNav]);

  return (
    <Flex
      sx={{
        flexDirection: "column",
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

      <AnimatePresence mode="wait" initial={false} custom={transitionSettings}>
        <motion.div
          key={location.pathname}
          custom={transitionSettings}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Flex
            as="main"
            sx={{
              width: "100%",
              flex: "1 1 auto",
              flexDirection: "column",
              px: [0],
              minHeight: "75vh",
            }}
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
