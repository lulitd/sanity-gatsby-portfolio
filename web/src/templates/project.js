import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import Project from '../components/project'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: {eq: $id}) {
      id
      publishedAt
      categories {
        _id
        title
      }
      accolades {
        _id
        date(formatString: "YYYY")
        title
        event
        linkTo
        address
      }
      relatedProjects {
        title
        mainImage {
          crop {
            _key
            _type
            top
            bottom
            left
            right
          }
          hotspot {
            _key
            _type
            x
            y
            height
            width
          }
          asset {
            _id
          }
          alt
        }
        _id
        slug {
          current
        }
      }
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
        alt
      }
      title
      slug {
        current
      }
      _rawProjectBreakdown
      _rawProjectBrief
      members {
        _key
        person {
          image {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
          }
          name
        }
        roles
        
      }
    }
  }
`

const ProjectTemplate = props => {
  const {data, errors} = props
  const project = data && data.project
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {project && <SEO title={project.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {project && <Project {...project} />}
    </Layout>
  )
}

export default ProjectTemplate
