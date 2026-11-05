import React from "react";
import { Box, Flex, Grid, Heading, Text } from "theme-ui";
import Container from "../container";
import AnimWebBanner from "../../animIcons/animWebBanner";
const process = [
  {
    title: "Explore",
    description:
      "Prototype early. Test ideas. Ask questions, experiment, and find the right direction.",
  },
  {
    title: "Design",
    description: "Translate ideas into visuals, stories, and interactive concepts.",
  },
  {
    title: "Deliever",
    description: "Refine, problem-solve, and bring the final experience to life.",
  },
];

const areas = [
  {
    title: "Visual Storytelling",
    skills: "Interaction systems · UX · Prototyping · User flows · Experience design",
  },
  {
    title: "Creative Development",
    skills: "JavaScript · WebGL · Unity · C# · Interactive experiences",
  },
  {
    title: "Motion & Video",
    skills:
      "Video editing · Motion graphics · Animations · Livestream production · Post-production",
  },
  {
    title: "Experiential Technology",
    skills:
      "Motion tracking · Real-time graphics · Projection mapping · Physical interfaces · Installations",
  },
];

function WorkingApproach() {
  return (
    <Container sx={{ overflow: "hidden" }}>
      <Box px={[3, 4, 5]} py={"50px"}>
        <Box>
          <Heading as="h3" sx={{ mb: 4 }}>
            How I Work
          </Heading>

          <Grid columns={[1, 3]} gap={[4, 5]}>
            {process.map((item, index) => (
              <Box
                key={item.title}
                sx={{
                  borderTop: "3px solid",
                  borderColor: "secondary",
                  pt: 3,
                  px: 2,
                }}
              >
                <Text
                  as="p"
                  sx={{
                    fontFamily: "nav",
                    color: "secondary",
                    mb: 2,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>

                <Heading
                  as="h4"
                  sx={{
                    color: "secondary",
                    fontSize: [4, 4, 4],
                    mb: 2,
                  }}
                >
                  {item.title}
                </Heading>

                <Text>{item.description}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
        <Flex
          my={8}
          mx={["-24px", "auto"]}
          sx={{
            width: ["100vw", "auto"],
            overflow: "hidden",
            justifyContent: "center",
            "& svg": {
              width: ["900px", "100%"],
              maxWidth: "none",
              height: "auto",
              flexShrink: 0,
            },
          }}
        >
          <AnimWebBanner />
        </Flex>

        <Box
          sx={{
            pt: 5,
          }}
        >
          <Heading as="h3" sx={{ mb: 4 }}>
            Skills & Disciplines
          </Heading>

          <Grid columns={[1, 2]} gap={[4, 5]}>
            {areas.map((item) => (
              <Box
                key={item.title}
                sx={{
                  pt: 3,
                }}
              >
                <Heading
                  as="h4"
                  sx={{
                    color: "secondary",
                    fontSize: [3, 3, 3],
                    mb: 2,
                  }}
                >
                  {item.title}
                </Heading>

                <Text>{item.skills}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default WorkingApproach;
