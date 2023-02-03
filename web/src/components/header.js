import React from "react";
import Icon from "./icon";
import { jsx, Button , Box} from "theme-ui";
import { Flex} from "rebass";
import Container from "./container";
import ThemedLink from "./ThemedLink";
import { lighten } from "@theme-ui/color";
import { Themed } from '@theme-ui/mdx';
// import { useColorMode } from "theme-ui";

///@jsx jsx
const Branding = (props) => (
  <Box flex="1">
    <ThemedLink
      to="/"
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
    </ThemedLink>
  </Box>
);

const ToggleButton = ({ showNav, onHideNav, onShowNav }) => (
  <Button
    onClick={showNav ? onHideNav : onShowNav}
    fontSize={4}
    m={0}
    p={2}
    sx={{
      display:["block","none"],
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
    sx={{
      paddingLeft: [1, 3]
    }}
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
      position: ["absolute", "static"],
      left: 0,
      right: 0,
      top: 0,
      bottom:0,
      height: ["calc(100vh)", "inherit"],
      pt: 2,
      backgroundColor:["background","transparent"],
      border: "0px solid transparent",
      zIndex:1000
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
        <NavLink to="/about/">About</NavLink>
      </li>
      <li>
        <NavLink to="/archive/" >Projects</NavLink>
      </li>
      {/* <li>
        <NavLink to="/posts/"  trigger={async pages => {const exit = await pages.exit;
            const entry = await pages.entry;
            await entry.visible;
            onHideNav();}}>Blog</NavLink>
      </li> */}
      {/* <li>
        <Button as="a" href="../2022-CV-Lalaine-Ulit-Destajo.pdf"
            target="_blank" rel="noreferrer noopener"
            variant="nav"
            sx={{
              color:"primary",
              p:0, 
              paddingLeft: [1, 3],
              display: "block",
          }}>CV</Button>
      </li> */}
      <li>
        <NavLink to="/contact/" >Contact</NavLink>
      </li>
    </Flex>
  </Box>
);

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => {
  // const [colorMode, setColorMode] = useColorMode();
  return (
    <Flex
      sx={{
        position: "fixed",
        zIndex: 100,
        width: "100%",
        alignItems: "center",
        backgroundColor:"background",
        borderWidth:[1],
        borderBottomColor: ["primary", "transparent"],
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

        }}
      >
        <Branding />
        <ToggleButton showNav={showNav} onHideNav={onHideNav} onShowNav={onShowNav} />
        <Nav showNav={showNav} onHideNav={onHideNav} onShowNav={onShowNav} />
      </Container>
    </Flex>
    
  );
};

export default Header;
