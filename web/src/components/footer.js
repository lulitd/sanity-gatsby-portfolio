import React from "react";
import SocialsFromBio from "./socials-from-bio";
import Container from "./container";
import { alpha } from "@theme-ui/color";
import ThemedLink from "./ThemedLink";

import { useThemeUI,Flex, Text } from "theme-ui";

const CleanLink = ({ to, children }) => {
  const context = useThemeUI();
  const { colors } = context.theme;
  return (
    <ThemedLink
      hex={colors.primary}
      to={to}
      sx={{
        color: "muted",
        textDecoration: "none",
        "&:hover": {
          color: "secondary",
          textDecoration: "underline",
        },
      }}
    >
      {children}
   </ThemedLink>
  );
};

const Footer = ({ author }) => (
  <Flex as="footer" sx={{ alignItems: "center", width: "100%" }}>
    <Container
      sx={{
        px:[2, null, 3],
        py:[2],
        position: "relative",
        "::before": {
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "2px",
          backgroundImage: (t) => `
          linear-gradient(
            to right,
            ${alpha("primary", 1)(t)},
            ${alpha("background", 1)(t)}
          )
        `,
          borderRadius: "default",
        },
      }}
    >
      <Text py={2}>
        Designed & Built by <CleanLink to="/">{author.name}</CleanLink>
      </Text>
      <SocialsFromBio bio={author} />
    </Container>
  </Flex>
);

export default Footer;
