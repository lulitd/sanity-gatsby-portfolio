import React from "react";
import { Grid, Box, Heading } from "theme-ui";
import ThemedLink from "./ThemedLink";
import PostPreview from "./post-preview";

function PostPreviewGrid({ title = "", nodes: [], browseMoreHref = "", columns = [1, 2, null] }) {
  return (
    <Box>
      {props.title && <Heading as="h2">{props.title}</Heading>}
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
            <Box as="li" key={node._id} sx={{ height: "100%" }}>
              <PostPreview {...node} />
            </Box>
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

export default PostPreviewGrid;
