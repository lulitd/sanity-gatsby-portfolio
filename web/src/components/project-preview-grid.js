import React from 'react'
import ProjectPreview from './project-preview'
import {Styled,Grid,Box,jsx} from  "theme-ui"
import ThemedLink from './ThemedLink'

//@jsx jsx

function ProjectPreviewGrid (props) {


  return (
    <Box>
      {props.title && <Styled.h2 >{props.title}</Styled.h2>}
      <Grid as='ul'
      gap={[3,4]}
      columns={props.columns}
       sx={{
         listStyle:"none",
         color:'inherit',
         flexDirection: 'column',
         m:0,
         px:0,
         pb:3,
       }}>
        {props.nodes &&
          props.nodes.map(node => (
            <Styled.li key={node.id}>
              <ProjectPreview {...node} />
            </Styled.li>
          ))}
      </Grid>
      {props.browseMoreHref && (
        <div>
          <ThemedLink variant="outlineBtn" to={props.browseMoreHref}>Browse More</ThemedLink>
        </div>
      )}
    </Box>
  )
}

ProjectPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
  columns:[1,2,null],
}

export default ProjectPreviewGrid
