import React from "react";
import Icon from "./icon";
import { Button, Box, Text, Flex, Image, Heading, Card, Grid } from "theme-ui";
import { darken, alpha, lighten } from "@theme-ui/color";
import SanityImage from "gatsby-plugin-sanity-image";
import { keyframes } from "@emotion/react";
// import { useColorMode } from "theme-ui";

function CardRow({ headingLevel, infoList }) {
  headingLevel = headingLevel ?? "h4";
  infoList = [
    {
      icon: "ux",
      title: "UX",
      text:
        "Create enjoyable experiences for users and audiences that are easy to use, accessible to all, and leave a lasting impression."
    },
    {
      icon: "tools",
      title: "R&D",
      text:
        "Stay up-to-date on the latest technology trends and determine the appriopriate technology stack for the project's needs and budget."
    },
    {
      icon: "device",
      title: "Motion Design",
      text: "Animating your vision to life with the latest technology."
    },
    {
      icon: "controller",
      title: "Crafting Interactive Content",
      text:
        "Design & develop captivating interactive experiences for various platforms including mobile, web, games, and live events."
    }
  ];
  if (!infoList) return null;

  return (
    <Grid gap={2} columns={[2, null, 4]}>
      {infoList.map(info => {
        return (
          <Card variant="primary" key={`card-row-${info.title}`}>
            <Icon symbol={info.icon} sx={{ height: 50, width: 50 }} />
            <Heading
              as={headingLevel}
              sx={{
                fontSize: [3, 3, 3]
              }}
            >
              {info.title}
            </Heading>
            <Text>{info.text}</Text>
          </Card>
        );
      })}
    </Grid>
  );
}

export default CardRow;
