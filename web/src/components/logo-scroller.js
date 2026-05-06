import React from "react";
import { Box, Text, Flex } from "theme-ui";
import { alpha } from "@theme-ui/color";
// import SanityImage from "gatsby-plugin-sanity-image";
import { keyframes } from "@emotion/react";
import SanityImage from "./image";

const slide = keyframes({
  from: { transform: "translateX(0)" },
  to: { transform: "translateX(-100%)" },
});

function LogoList({ logos, logoSize, duration, prefix }) {
  return (
    <Box
      className="logoList"
      sx={{
        display: "inline-block",
        minWidth: "100%",
        animation: `${slide} ${duration}s infinite linear`,
        pr: 3,
        "& img,svg": {
          opacity: 0.5,
        },
      }}
    >
      <Flex
        sx={{
          justifyContent: "space-around",
          gap: 3,
        }}
      >
        {logos.map((logo, i) => {
          return (
            <SanityImage
              variant="logo"
              key={`${prefix}-${logo.asset._id}`}
              image={logo}
              height={logoSize}
              sx={{
                height: logoSize,
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

  return (
    <Box>
      {title && (
        <Text
          as={"p"}
          sx={{
            color: "primary",
            opacity: 0.6,
            fontFamily: "nav",
            pb: 1,
            fontSize: [1, 1, 1],
            lineHeight: "initial",
            textTransform: "uppercase",
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          {title}
        </Text>
      )}
      <Box
        {...rest}
        sx={{
          py: 2,
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
            background: (t) => `
      linear-gradient(
        90deg,
        ${alpha("background", 1)(t)} 0%,
        ${alpha("background", 0.5)(t)} 70%,
        ${alpha("background", 0)(t)} 100%
      )`,
          },
          "&:after": {
            content: '""',
            position: "absolute",
            inset: 0,
            left: "85%",
            zIndex: 5,
            background: (t) => `
      linear-gradient(
        -90deg,
        ${alpha("background", 1)(t)} 0%,
        ${alpha("background", 0.5)(t)} 70%,
        ${alpha("background", 0)(t)} 100%
      )`,
          },
          "&:hover .logoList": {
            animationPlayState: "paused",
          },
        }}
      >
        <LogoList logos={logos} logoSize={logoHeight} duration={duration} prefix="first" />
        <LogoList logos={logos} logoSize={logoHeight} duration={duration} prefix="second" />
      </Box>
    </Box>
  );
}

export default LogoScroller;
