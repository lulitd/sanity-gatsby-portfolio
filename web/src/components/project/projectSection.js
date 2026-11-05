import React from "react";
import { Grid, Heading, Box } from "theme-ui";

export default function ProjectSection({ title, children }) {
  if (!children) return null;

  return (
    <Grid
      as="section"
      columns={["minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 150px) minmax(0, 1fr)"]}
      gap={[3, 4, 5]}
      sx={{
        my: [4, 5, 8],
        alignItems: "start",
        minWidth: 0,
      }}
    >
      <Heading
        as="h2"
        sx={{
          color: "secondary",
          fontFamily: "heading",
          fontSize: [5, 5, 3],
          lineHeight: 1.25,
          textAlign: ["left", "left", "right"],
          overflowWrap: "break-word",
          m: 0,
          mt: [3, 3, 0],
        }}
      >
        {title}
      </Heading>

      <Box
        sx={{
          minWidth: 0,
          borderLeft: ["none", "none", "2px solid"],
          borderLeftColor: ["primary", "primary", "secondary"],
          pl: [0, 0, 4],
        }}
      >
        {children}
      </Box>
    </Grid>
  );
}
