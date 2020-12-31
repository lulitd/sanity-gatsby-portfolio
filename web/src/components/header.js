import React from "react";
import Icon from "./icon";
import { jsx } from "theme-ui";
import { Flex, Box, Button } from "rebass";
import Container from "./container";
import ThemedLink from "./ThemedLink";
import { lighten } from "@theme-ui/color";
import { useColorMode } from "theme-ui";
///@jsx jsx
const Branding = (props) => (
  <Box flex="1">
    <ThemedLink
      to="/"
      cover
      direction="down"
      duration={1.5}
      variant="nav"
      sx={{
        color: "primary",
      }}
    >
      <Icon
        symbol="logo"
        sx={{
          verticalAlign: "middle",
          display: "inline-block",
        }}
      />
      {/* <span sx={{
        paddingLeft: [1],
        verticalAlign: 'middle',
      }} >Lalaine</span> */}
    </ThemedLink>
  </Box>
);

const ToggleButton = ({ showNav, onHideNav, onShowNav }) => (
  <Button
    display={["block", "none"]}
    onClick={showNav ? onHideNav : onShowNav}
    fontSize={4}
    m={0}
    p={2}
    sx={{
      border: "none",
      color: "inherit",
      background: "none",
    }}
  >
    <Icon symbol="hamburger" />
  </Button>
);

const NavLink = ({ to, children }) => (
  <ThemedLink
    to={to}
    variant="nav"
    cover
    direction="down"
    duration={1.5}
    sx={{
      // color: 'inherit',
      // textDecoration: 'none',
      // display: 'block',
      // fontFamily: 'heading',
      // letterSpacing: [1],

      // '&:hover': {
      //   color: 'secondary'
      // },
      paddingLeft: [1, 3],
      // paddingY: [2,0],
    }}
  >
    {children}
  </ThemedLink>
);

const Nav = ({ showNav }) => (
  <Box
    as="nav"
    display={[showNav ? "flex" : "none", "flex"]}
    color={["text"]}
    sx={{
      position: ["absolute", "static"],
      left: 0,
      right: 0,
      top: "60px",
      height: ["calc(100vh - 60px)", "inherit"],
      pt: 2,
      backgroundColor: [lighten("background", 0.1), "transparent"],
      border: "2px solid transparent",
      borderBottomColor: ["primary", "transparent"],
    }}
  >
    <Flex
      as="ul"
      sx={{
        listStyle: "none",
        justifyContent: "center",
        marginX: "auto",
        p: [2, 0],
        flexDirection: ["column", "row"],
        alignItems: ["center", "inherit"],
        fontSize: [7, 3],
      }}
    >
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about/">About</NavLink>
      </li>
      <li>
        <NavLink to="/archive/">Projects</NavLink>
      </li>
      {/* <li>
        <NavLink to="/posts/">Blog</NavLink>
      </li> */}
      <li>
        <NavLink to="/contact/">Contact</NavLink>
      </li>
    </Flex>
  </Box>
);

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Flex
      sx={{
        position: "fixed",
        zIndex: 100,
        width: "100%",
        alignItems: "center",
      }}
      as="header"
    >
      <Container
        px={[2]}
        py={[2, 3]}
        backgroundColor="background"
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          "&:before": {
            content: "''",
            float: "left",
            backgroundColor: [`${showNav ? "transparent" : "primary"}`, "primary"],
            width: "100%",
            height: "2px",
            borderRadius: "1px",
            marginTop: "1px",
            position: "absolute",
            display: "block",
            bottom: 0,
            left: 0,
          },
        }}
      >
        <Branding />
        <ToggleButton showNav={showNav} onHideNav={onHideNav} onShowNav={onShowNav} />
        <Nav showNav={showNav} />
      </Container>
    </Flex>
  );
};

export default Header;
