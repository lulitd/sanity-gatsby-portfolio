import React from "react";
import ProjectPreview from "./project-preview";
import { Grid, Box } from "theme-ui";
import ThemedLink from "./ThemedLink";
import { Flex } from "rebass";
import { Themed } from "@theme-ui/mdx";
const { isFuture, parseISO } = require("date-fns");

function ShouldSpanFull(id, length) {
  var isThird = id % 3 == 0;
  var isLastAndOdd = length - 1 == id && id % 2 == 0 && !((id - 2) % 3 == 0);
  return (isThird || isLastAndOdd) && length != 2;
}

function ProjectPreviewGrid({ nodes, title, order, columns, ...props }) {
  let filtered = nodes.filter(node => !isFuture(parseISO(node.publishedAt)));

  if (order) {
    const idOrder = order.map(o => o._id);
    filtered.sort(function(a, b) {
      const orderIndexA = idOrder.indexOf(a._id);
      const orderIndexB = idOrder.indexOf(b._id);
      if (orderIndexB >= 0 && orderIndexA >= 0) {
        return orderIndexA - orderIndexB;
      } else if (orderIndexB == orderIndexA) {
        // if they are both the same then they aren't in the list
        const offset = idOrder.length * 2;
        const nodeIndexA = filtered.findIndex(n => n._id == a._id);
        const nodeIndexB = filtered.findIndex(n => n._id == b._id);

        return nodeIndexA - nodeIndexB + offset;
      } else {
        return orderIndexB;
      }
    });
  }

  return (
    <Box>
      {title && <Themed.h2>{title}</Themed.h2>}
      <Grid
        as="ul"
        columns={filtered.length > 1 ? columns : 1}
        sx={{
          listStyle: "none",
          color: "inherit",
          flexDirection: "column",
          my: [2, null, 3],
          px: 0,
          pb: 3,
          columnGap: [2, 3],
          rowGap: [3],
          "& li[data-span='true']": {
            gridColumn: ["auto", "auto", "1 / span 2"]
          }
        }}
      >
        {filtered &&
          filtered.map((node, i) => (
            <Themed.li key={node._id} data-span={ShouldSpanFull(i, filtered.length)}>
              <ProjectPreview {...node} isFull={ShouldSpanFull(i, filtered.length)} />
            </Themed.li>
          ))}
      </Grid>
      {props.browseMoreHref && (
        <Flex justifyContent={["center", "center", "left"]} flexDirection="row">
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
  columns: [1, 1, 2]
};

export default ProjectPreviewGrid;
