import React from "react";
import ProjectPreview from "./project-preview";
import { Grid, Box, jsx } from "theme-ui";
import { Themed } from '@theme-ui/mdx';
import ThemedLink from "./ThemedLink";
import PostPreview from "./post-preview";

//@jsx jsx

function PostPreviewGrid(props) {
  return (
    <Box>
      {props.title && <Themed.h2>{props.title}</Themed.h2>}
      <Grid
        as="ul"
        gap={[3, 4]}
        columns={props.columns}
        sx={{
          listStyle: "none",
          color: "inherit",
          flexDirection: "column",
          m: 0,
          mb: [2, null, 3],
          px: 0,
          pb: 4,
        }}
      >
        {props.nodes &&
          props.nodes.map((node) => (
            <Themed.li key={node._id} sx={{ height: "100%" }}>
              <PostPreview {...node} />
            </Themed.li>
          ))}
      </Grid>
      {props.browseMoreHref && (
        <div>
          <ThemedLink variant="outlineBtn" to={props.browseMoreHref}>
            Browse More
          </ThemedLink>
        </div>
      )}
    </Box>
  );
}

PostPreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: "",
  columns: [1, 2, null],
};

export default PostPreviewGrid;
