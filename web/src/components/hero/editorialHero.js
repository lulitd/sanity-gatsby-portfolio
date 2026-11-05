import React from "react";
import { Box, Text } from "theme-ui";
import { alpha } from "@theme-ui/color";
import HeroContent from "./heroContent";
import theme from "../../gatsby-plugin-theme-ui";

const EditorialHero = ({ title, subtitle, socialIcons, categories = [] }) => {
  const category = categories?.[0]?.title;

  return (
    <Box
      as="header"
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        minHeight: ["auto", "60vh", "70vh"],
        px: [3, 4, 5],
        py: [6, 7],
        borderBottom: "1px solid",
        borderColor: alpha("primary", 0.4),
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Decorative background */}
      <Text
        aria-hidden="true"
        sx={{
          position: "absolute",
          zIndex: 0,
          right: [-3, -4, 0],
          bottom: [-4, -5, -6],
          fontFamily: "heading",
          fontSize: ["200px", "300px", "450px"],
          fontWeight: 900,
          lineHeight: 0.8,
          textTransform: "uppercase",
          color: alpha("primary", 0.02),
          WebkitTextStroke: (theme) => `1px ${alpha("primary", 0.15)(theme)}`,
          pointerEvents: "none",
          userSelect: "none",
          textAlign: "right",
        }}
      >
        {title}
      </Text>

      {/* Editorial content */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          position: "relative",
          zIndex: 1,
          p: 2,
          background: (t) => `
                linear-gradient(
                   to right,
                  ${alpha("background", 0.5)(t)},
                  ${alpha("background", 0.5)(t)},
                  ${alpha("background", 0.1)(t)},
                  ${alpha("background", 0)(t)}
                )`,
        }}
      >
        {category && (
          <Text
            sx={{
              display: "block",
              mb: 4,
              color: "secondary",
              fontFamily: "body",
              fontSize: [1, 2],
              fontWeight: "bold",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </Text>
        )}

        <HeroContent title={title} subtitle={subtitle} socialIcons={socialIcons} />
      </Box>
    </Box>
  );
};

export default EditorialHero;
