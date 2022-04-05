import React from "react";
import ProjectPreview from "./project-preview";
import { Styled, Grid, Box, jsx } from "theme-ui";
import ThemedLink from "./ThemedLink";
import { Flex } from "rebass";

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
          m: 2,
          mb: [2, null, 3],
          px: 0,
          pb: 3,
          columnGap: [2,3],
          rowGap:[3],
          "& li:nth-child(3n+1)":{
            gridColumn:['auto','auto','1 / span 2'],
          },
          ...(hasEvenElements && { "& li:last-child ":{
            gridColumn:['auto','auto','1 / span 2']
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
        <Flex justifyContent={["center","center","left"]} flexDirection="row">
          <ThemedLink block variant="outlineBtn" to={props.browseMoreHref}>
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
