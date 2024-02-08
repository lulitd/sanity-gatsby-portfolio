import React from "react";
import ProjectPreview from "./project-preview";
import { Grid, Box, Heading } from "theme-ui";
import ThemedLink from "./ThemedLink";
import { Flex } from "rebass";
import { Themed } from "@theme-ui/mdx";
import { alpha } from "@theme-ui/color";
const { isFuture, parseISO } = require("date-fns");

function ShouldSpanFull(id, length) {
  // var isThird = id % 3 == 0;
  // var isLastAndOdd = length - 1 == id && id % 2 == 0 && !((id - 2) % 3 == 0);
  // return (isThird || isLastAndOdd) && length != 2;
  return true;
}

function ProjectPreviewGrid({ nodes, title, order, columns, ...props }) {
  let filtered = nodes.filter((node) => !isFuture(parseISO(node.publishedAt)));

  if (order) {
    const idOrder = order.map((o) => o._id);
    filtered.sort(function (a, b) {
      const orderIndexA = idOrder.indexOf(a._id);
      const orderIndexB = idOrder.indexOf(b._id);
      if (orderIndexB >= 0 && orderIndexA >= 0) {
        return orderIndexA - orderIndexB;
      } else if (orderIndexB == orderIndexA) {
        // if they are both the same then they aren't in the list
        const offset = idOrder.length * 2;
        const nodeIndexA = filtered.findIndex((n) => n._id == a._id);
        const nodeIndexB = filtered.findIndex((n) => n._id == b._id);

        return nodeIndexA - nodeIndexB + offset;
      } else {
        return orderIndexB;
      }
    });
  }

  return (
    <Box
      sx={{
        backgroundImage: (t) => `
        linear-gradient(
          to bottom,
          ${alpha("darkest", 0.3)(t)},
          ${alpha("darkest", 0.2)(t)},
          ${alpha("darkest", 0.2)(t)},
          ${alpha("darkest", 0.3)(t)}
        )
      `,
        py: 4,
        borderRadius: "3rem",
        borderTop: "2px dotted orange",
        borderBottom: "2px dotted orange",
        borderColor: "primary",
        px: [2, 2, 4],
      }}
    >
      {title && (
        <Heading
          as={"h2"}
          sx={{
            color: "primary",
            opacity: 0.6,
            fontFamily: "nav",
            pb: 1,
            fontSize: [4, 4, 4],
            fontWeight: "400",
            lineHeight: "initial",
            textTransform: "uppercase",
            textAlign: "center",
            textWrap: "balance",
          }}
        >
          {title}
        </Heading>
      )}
      <Grid
        columns={1}
        sx={{
          color: "inherit",
          my: [5, 3, 3],
          px: 0,
          pb: 3,
          rowGap: [5, 3, 5],
        }}
      >
        {filtered &&
          filtered.map((node, i) => (
            <Box key={node._id}>
              <ProjectPreview {...node} />
            </Box>
          ))}
      </Grid>
      {props.browseMoreHref && (
        <Flex justifyContent={"space-around"}>
          <ThemedLink variant="outlineBtn" to={props.browseMoreHref}>
            Browse More
          </ThemedLink>
        </Flex>
      )}
    </Box>
  );
}

ProjectPreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: "",
  columns: [1, 1, 2],
};

export default ProjectPreviewGrid;
