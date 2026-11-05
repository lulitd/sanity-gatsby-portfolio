import React from "react";
import Icon from "../icon";
import { Box, Text, Heading, Card, Grid, Paragraph } from "theme-ui";
import { alpha, darken, lighten, getColor } from "@theme-ui/color";
import { keyframes } from "@emotion/react";

const travelPath = keyframes`
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
`;

function CardRow({ headingLevel, infoList }) {
  headingLevel = headingLevel ?? "h4";

  infoList = [
    {
      icon: "ux",
      decor: "1",
      title: "Visual Storytelling",
      text: "Shaping captivating stories through video, motion & interactive media.",
      themeColor: "primary",
    },
    {
      icon: "tools",
      decor: "2",
      title: "Creative Development",
      text: "Building interactive experiences across websites, installations & real-time media.",
      themeColor: "secondary",
    },
    {
      icon: "controller",
      decor: "3",
      title: "Technical R&D",
      text: "Exploring emerging technologies, prototyping ideas, and finding creative solutions.",
      themeColor: "primary",
    },
    {
      icon: "controller",
      decor: "4",
      title: "Creative Production",
      text: "Taking projects from early concepts production and final delivery.",
      themeColor: "primary",
    },
  ];
  if (!infoList) return null;
  return (
    <>
      <Text
        as={"p"}
        sx={{
          color: "primary",
          fontFamily: "nav",
          pb: 3,
          fontSize: [4, 4, 4],
          lineHeight: "initial",
          textTransform: "uppercase",
          textAlign: "center",
          textWrap: "balance",
        }}
      >
        I work across the space between <br></br>
        <span
          sx={{
            "&:before": {
              content: "'<< '",
            },
            "&:after": {
              content: "' >> '",
            },
          }}
        >
          creativity & technology
        </span>
      </Text>

      <Grid
        gap={(3, 3, 5)}
        columns={[1, 2]}
        sx={{
          "--rectInset": ["10%", "25%"],
          position: "relative",
          isolation: "isolate",
          //dotted rect
          "&:before": {
            content: '""',
            position: "absolute",
            inset: "var(--rectInset,10%)",
            border: (theme) => `2px dotted ${getColor(theme, "secondary")}`,
            zIndex: "-1000",
            pointerEvents: "none",
          },
          "&:after": {
            "--circleSize": "10px",
            content: '""',
            position: "absolute",
            width: "var(--circleSize,5px)",
            height: "var(--circleSize,5px)",
            borderRadius: "50%",
            bg: "secondary",
            boxShadow: (theme) => `0 0 12px ${getColor(theme, "secondary")}`,
            offsetPath: ["inset(var(--rectInset,10%))"],
            offsetDistance: "17%",
            offsetRotate: "0deg",
            animation: `${travelPath} 25s linear infinite`,
            zIndex: -1,
            filter: "blur(2px)",
          },
          "@media (prefers-reduced-motion: reduce)": {
            "&::after": {
              animation: "none",
            },
          },
        }}
      >
        {infoList.map((info) => {
          return (
            <Card
              variant="standard"
              color="secondary"
              key={`card-${info.title}`}
              sx={{
                bg: alpha("background", 0.9),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 20,
                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0,
                boxShadow: (theme) => `0px 10px 0px ${darken("secondary", 0.3)(theme)}`,
                px: 15,
                py: 30,
                textWrapStyle: "balance",
              }}
            >
              <Heading as={headingLevel} sx={{ color: "secondary", fontSize: [3, 3, 3] }}>
                {info.title}
              </Heading>
              <Text color="text" sx={{ width: "100%", maxWidth: "350px", textAlign: "center" }}>
                {info.text}
              </Text>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}

export default CardRow;
