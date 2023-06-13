import React from "react";
import Icon from "./icon";
import { Button, Box, Text, Flex, Image, Heading } from "theme-ui";
import { darken, alpha, lighten } from "@theme-ui/color";
import SanityImage from "gatsby-plugin-sanity-image";
import { keyframes } from "@emotion/react";
// import { useColorMode } from "theme-ui";

const slide = keyframes({
  from: { transform: "translateX(0)" },
  to: { transform: "translateX(-100%)" }
});

function LogoList(logos, logoSize, duration) {
  return (
    <Box
      className="logoList"
      sx={{
        display: "inline-block",
        minWidth: "100%",
        animation: `${slide} ${duration}s infinite linear`,
        "& img,svg": {
          mx: 3,
          opacity: 0.5
        }
      }}
    >
      <Flex
        sx={{
          justifyContent: "space-around"
        }}
      >
        {logos.map(logo => {
          return (
            <SanityImage
              {...logo}
              sx={{
                height: logoSize
              }}
            />
          );
        })}
      </Flex>
    </Box>
  );
}

function LogoScroller({ title, logos, logoHeight, duration, backgroundColor, ...rest }) {
  logoHeight = logoHeight ?? 75;
  duration = duration ?? 30;
  backgroundColor = backgroundColor ?? "third";

  if (!logos || logos.length == 0) return null;
  const logolist = LogoList(logos, logoHeight, duration);

  return (
    <>
      <Heading
        sx={{
          color: "primary",
          fontWeight: "normal",
          fontSize: [1, 1, 2],
          margin: 0,
          mb: 2,
          textAlign: "center"
        }}
      >
        {title}
      </Heading>
      <Box
        {...rest}
        sx={{
          py: 3,
          position: "relative",
          isolation: "isolate",
          background: alpha(backgroundColor, 0.1),
          borderColor: alpha(backgroundColor, 0.1),
          borderStyle: "solid",
          borderWidth: ["2px 0px"],
          overflow: "hidden",
          whiteSpace: "nowrap",
          mb: 4,
          "&:before": {
            content: '""',
            position: "absolute",
            inset: 0,
            right: "85%",
            zIndex: 5,
            background: t => `
      linear-gradient(
        90deg,
        ${alpha("background", 1)(t)} 0%,
        ${alpha("background", 0.5)(t)} 70%,
        ${alpha("background", 0)(t)} 100%
      )`
          },
          "&:after": {
            content: '""',
            position: "absolute",
            inset: 0,
            left: "85%",
            zIndex: 5,
            background: t => `
      linear-gradient(
        -90deg,
        ${alpha("background", 1)(t)} 0%,
        ${alpha("background", 0.5)(t)} 70%,
        ${alpha("background", 0)(t)} 100%
      )`
          },
          "&:hover .logoList": {
            animationPlayState: "paused"
          }
        }}
      >
        {logolist}
        {logolist}
      </Box>
    </>
  );
}

export default LogoScroller;
