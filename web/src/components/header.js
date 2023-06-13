import React from "react";
import Icon from "./icon";
import { Button, Box, Flex, Grid } from "theme-ui";
import Container from "./container";
import ThemedLink from "./ThemedLink";
import { lighten } from "@theme-ui/color";
import { alpha } from "@theme-ui/color";
import { Themed } from "@theme-ui/mdx";
import { secondsToMilliseconds } from "date-fns";
import { keyframes } from "@emotion/react";
// import { useColorMode } from "theme-ui";

const iconAnim = keyframes`
 0%{transform: translateY(0px)},
 25%{transform: translateY(-12px)},
 50%{transform: translateY(0px)},
 100%{transform: translateY(0px)}
`;

const Branding = props => (
  <Box flex="1">
    <ThemedLink to="/" variant="nav" activeClassName="active" aria-label="Return to Home">
      <Icon
        symbol="logo"
        sx={{
          verticalAlign: "middle",
          display: "inline-block"
        }}
      />
    </ThemedLink>
  </Box>
);

const ToggleButton = ({ showNav, onHideNav, onShowNav }) => (
  <Button
    onClick={showNav ? onHideNav : onShowNav}
    fontSize={4}
    m={0}
    p={2}
    aria-label="Menu"
    sx={{
      display: ["block", "none"],
      border: "none",
      color: "inherit",
      background: "none"
    }}
  >
    <Icon symbol="hamburger" sx={{ height: 28, width: 28 }} />
  </Button>
);

const NavLink = ({ to, children }) => (
  <ThemedLink
    to={to}
    variant="nav"
    sx={{
      ml: [1, 3]
    }}
    activeClassName="active"
    partiallyActive={true}
  >
    {children}
  </ThemedLink>
);

const Nav = ({ showNav, onHideNav, onShowNav }) => (
  <Box
    as="nav"
    color={["text"]}
    sx={{
      display: [showNav ? "flex" : "none", "flex"],
      left: 0,
      right: 0,
      top: 0,
      position: ["absolute", "inherit", "inherit"],
      height: ["100dvh", "inherit", "inherit"],
      pt: 2,
      backgroundColor: ["background", "transparent"],
      zIndex: [-5, "inherit", "inherit"]
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
        fontSize: [7, 3]
      }}
    >
      <li>
        <NavLink to="/about/">About</NavLink>
      </li>
      <li>
        <NavLink to="/projects/">Projects</NavLink>
      </li>
      <li>
        <NavLink to="/contact/">Contact</NavLink>
      </li>
    </Flex>
  </Box>
);

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => {
  return (
    <Flex
      sx={{
        position: "sticky",
        top: 0,
        width: "100%",
        bg: "background",
        alignItems: "center",
        zIndex: "99999"
      }}
      as="header"
    >
      <Container
        px={[2]}
        py={[2, 3]}
        sx={{
          position: "relative",
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          "::before": {
            content: '""',
            display: "block",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "1.5px",
            backgroundImage: t => `
            linear-gradient(
              to right,
              ${alpha("primary", 1)(t)},
              ${alpha("background", 1)(t)}
            )
          `,
            borderRadius: "default"
          }
        }}
      >
        <Box
          sx={{
            display: ["flex", "flex", "block"],
            flex: [1],
            justifyContent: "space-between"
          }}
        >
          <Branding />
          <ToggleButton showNav={showNav} onHideNav={onHideNav} onShowNav={onShowNav} />
        </Box>
        <Nav showNav={showNav} onHideNav={onHideNav} onShowNav={onShowNav} />
      </Container>
    </Flex>
  );
};

export default Header;
