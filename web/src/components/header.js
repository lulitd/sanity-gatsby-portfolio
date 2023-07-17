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
import StatusPill from "./status-pill";
// import { useColorMode } from "theme-ui";

const iconAnim = keyframes`
 0%{transform: translateY(0px)},
 25%{transform: translateY(-12px)},
 50%{transform: translateY(0px)},
 100%{transform: translateY(0px)}
`;

const Branding = props => (
  <Box flex="1">
    <ThemedLink
      to="/"
      variant="navBorderless"
      sx={{ pl: 0 }}
      aria-label="Return to Home"
      activeClassName="active"
    >
      <Icon
        symbol="logo"
        sx={{
          verticalAlign: "bottom",
          display: "inline-block"
        }}
      />
      <span sx={{ fontSize: "20px", pl: 1, display: ["inherit", "none", "inherit"] }}>Lalaine</span>
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
      display: "block",
      fontSize: [8, 2, 3],
      mx: [2, 1, 2],
      my: [0, 1, 1],
      py: [4, 1, 1],
      px: [2, 1, 1]
    }}
    activeClassName="active"
    partiallyActive={true}
  >
    {children}
  </ThemedLink>
);

const Nav = ({ showNav, onHideNav, onShowNav, status }) => (
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
        alignItems: ["center", "inherit"]
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
      <Box sx={{ display: "block", m: 0, ml: [0, "0.75rem", "0.75rem"], pt: "0.5rem" }}>
        <StatusPill
          currentStatus={status.statusAvailablity}
          message={status.statusMessage}
          contactInfo={status.contactEmail}
        />
      </Box>
    </Flex>
  </Box>
);

const Header = ({ onHideNav, onShowNav, showNav, siteTitle, status }) => {
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
        <Nav showNav={showNav} onHideNav={onHideNav} onShowNav={onShowNav} status={status} />
      </Container>
    </Flex>
  );
};

export default Header;
