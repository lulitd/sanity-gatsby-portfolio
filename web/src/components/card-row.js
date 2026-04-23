import React from "react";
import Icon from "./icon";
import { Box, Text, Heading, Card, Grid } from "theme-ui";
import { alpha } from "@theme-ui/color";

function CardRow({ headingLevel, infoList }) {
  headingLevel = headingLevel ?? "h4";

  infoList = [
    {
      icon: "ux",
      decor: "UX",
      title: "UX",
      text: "Create enjoyable experiences for users and audiences that are easy to use, accessible to all, and leave a lasting impression.",
      themeColor: "primary",
    },
    {
      icon: "tools",
      decor: "R&D",
      title: "R&D",
      text: "Stay up-to-date on the latest technology trends and determine the appriopriate technology stack for the project's needs and budget.",
      themeColor: "secondary",
    },
    {
      icon: "controller",
      decor: "CREATE",
      title: "Crafting Interactive Content",
      text: "Design & develop captivating interactive experiences for various platforms including mobile, web, games, and live events.",
      themeColor: "primary",
    },
  ];
  if (!infoList) return null;

  return (
    <Grid gap={(2, 2, 3)} columns={[1, 2, 3]}>
      {infoList.map((info) => {
        return (
          <Card
            key={`card-${info.title}`}
            sx={{
              placeSelf: "center",
              width: "100%",
              maxWidth: 300,
              borderRadius: 10,
              aspectRatio: "5 / 8",
              position: "relative",
              overflow: "hidden",
              background: info.themeColor,
              padding: 0,
            }}
          >
            <Box
              sx={{
                zIndex: 1,
                position: "absolute",
                top: 50,
                left: 0,
                width: "100%",
                height: "25%",
              }}
            >
              <Text
                sx={{
                  fontSize: 150,
                  fontFamily: "monospace",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  textAlign: "center",
                  lineHeight: 0,
                  letterSpacing: "0em",
                  color: alpha("lightest", 0.25),
                }}
              >
                {info.decor}
              </Text>
            </Box>
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "75%",
                maxHeight: "100%",
                bottom: 0,
                left: 0,
                zIndex: 2,
                padding: 3,
              }}
            >
              <Heading
                as={headingLevel}
                sx={{
                  fontSize: [3, 3, 3],
                  whiteSpace: "pre-line",
                  color: `${info.themeColor == "primary" ? "primary900" : "lightest"}`,
                }}
              >
                {info.title}
              </Heading>
              <Text
                sx={{
                  color: `${info.themeColor == "primary" ? "primary900" : "lightest"}`,
                }}
              >
                {info.text}
              </Text>

              <Box
                sx={{
                  position: "absolute",
                  width: "70px",
                  height: "70px",
                  borderRadius: 1000,
                  bg: info.themeColor,
                  color: `${info.themeColor == "primary" ? "primary900" : "secondary100"}`,
                  top: "-1em",
                  right: "20px",
                  zIndex: 2,
                  padding: "10px",
                }}
              >
                <Icon symbol={info.icon} sx={{ height: 50, width: 50 }} />
              </Box>
            </Box>
          </Card>
        );
      })}
    </Grid>
  );
}

export default CardRow;
