import React from "react";
import ProjectPreview from "./project-preview";
import { Grid, Box, jsx } from "theme-ui";
import ThemedLink from "./ThemedLink";
import { Flex } from "rebass";
import { Themed } from '@theme-ui/mdx';

//@jsx jsx

function ProjectPreviewGrid({nodes,title,order,columns, ...props }) {

  const hasEvenElements= nodes.length%2==0;


  if (order){
  const idOrder = order.map( o => o._id );
    nodes.sort(function(a, b) {
      const orderIndexA = idOrder.indexOf(a._id);
      const orderIndexB = idOrder.indexOf(b._id);
      if (orderIndexB>=0 && orderIndexA>=0 ){
        return orderIndexA - orderIndexB; 
      } else if (orderIndexB == orderIndexA){
       
        // if they are both the same then they aren't in the list
        const offset = idOrder.length *2; 
        const nodeIndexA = nodes.findIndex(n=> n._id==a._id); 
        const nodeIndexB = nodes.findIndex(n=> n._id==b._id); 

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
        columns={nodes.length > 1 ? columns : 1}
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
          "& li:nth-of-type(3n+1)":{
            gridColumn:['auto','auto','1 / span 2'],
          },
          ...(hasEvenElements && { "& li:last-child ":{
            gridColumn:['auto','auto','1 / span 2']
          }})
        }}
      >
        {nodes &&
          nodes.map((node,i) => (
            <Themed.li key={node._id}>
              <ProjectPreview {...node} isFull={i%3==0||i==0 || (hasEvenElements && i == nodes.length-1)} />
            </Themed.li>
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
