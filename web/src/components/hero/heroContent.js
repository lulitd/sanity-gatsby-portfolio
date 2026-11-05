import React from "react";
import { Box, Heading } from "theme-ui";

const HeroContent = ({
  title,
  subtitle,
  socialIcons,
  compact = false,
  light = false,
  maxWidth = "100%",
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth,
      }}
    >
      <Heading
        as="h1"
        sx={{
          fontSize: compact ? [5, 6, 7] : [6, 7, 8],
          lineHeight: 1.05,
          letterSpacing: "-0.035em",
          textTransform: "uppercase",
          color: light ? "primary" : "secondary",
          maxWidth: "16ch",
          overflowWrap: "break-word",
          mb: 4,
        }}
      >
        {title}
      </Heading>

      <Box
        sx={{
          width: "72px",
          height: "3px",
          bg: light ? "secondary" : "secondary900",
          mb: 4,
        }}
      />

      {subtitle && (
        <Heading
          as="h2"
          sx={{
            fontSize: compact ? [3, 3, 4] : [3, 4, 5],
            fontWeight: "normal",
            lineHeight: 1.35,
            maxWidth: "38ch",
            color: light ? "text" : "white",
            mb: 4,
          }}
        >
          {subtitle}
        </Heading>
      )}

      {socialIcons}
    </Box>
  );
};

export default HeroContent;
