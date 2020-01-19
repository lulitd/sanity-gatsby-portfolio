import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import {mapEdgesToNodes, filterOutDocsWithoutSlugs} from '../lib/helpers'

import {responsiveTitle1} from '../components/typography.module.css'

// export const query = graphql`
//   query BioPageQuery {
//     projects: allSanityProject(
//       limit: 12
//       sort: {fields: [publishedAt], order: DESC}
//       filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
//     ) {
//       edges {
//         node {
//           id
//           mainImage {
//             asset {
//               _id
//             }
//             alt
//           }
//           title
//           subtitle
//           slug {
//             current
//           }
//         }
//       }
//     }
//   }
// `

const AboutPage = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  return (
    <Layout>
      <SEO title='About' />
      <Container>
        <h1 className={responsiveTitle1}>About</h1>
      
      </Container>
    </Layout>
  )
}

export default AboutPage
