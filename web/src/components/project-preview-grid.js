import React from "react";
import ProjectPreview from "./project-preview";
import { Styled, Grid, Box, jsx } from "theme-ui";
import ThemedLink from "./ThemedLink";

//@jsx jsx

function ProjectPreviewGrid(props) {

  const hasEvenElements= props.nodes.length%2==0; 
  return (


    <Box>
      {props.title && <Styled.h2>{props.title}</Styled.h2>}
      <Grid
        as="ul"
        columns={props.nodes.length > 1 ? props.columns : 1}
        sx={{
          listStyle: "none",
          color: "inherit",
          flexDirection: "column",
          m: 0,
          mb: [2, null, 3],
          px: 0,
          pb: 3,
          columnGap: [1,2],
          rowGap:[3],
          "& li:nth-child(3n+1)":{
            gridColumn:['auto','1 / span 2'],
          },
          ...(hasEvenElements && { "& li:last-child ":{
            gridColumn:['auto','1 / span 2']
          }})
        }}
      >
        {props.nodes &&
          props.nodes.map((node,i) => (
            <Styled.li key={node._id}>
              <ProjectPreview {...node} isFull={i%3==0||i==0 || (hasEvenElements && i == props.nodes.length-1)} />
            </Styled.li>
          ))}
      </Grid>
      {props.browseMoreHref && (
        <Box>
          <ThemedLink block variant="outlineBtn" to={props.browseMoreHref}>
            Browse More
          </ThemedLink>
        </Box>
      )}
    </Box>
  );
}

ProjectPreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: "",
  columns: [1, 2, null],
};

export default ProjectPreviewGrid;
