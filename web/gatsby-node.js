const {isFuture} = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProjectPages (graphql, actions, reporter) {
  const {createPage} = actions
  const result = await graphql(`
  query IndexPageQuery {
    projects: allSanityProject(filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}) {
      edges {
        node {
          id
          publishedAt
          slug {
            current
          }
        }
      }
    }
    posts: allSanityPost(filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}) {
      edges {
        node {
          id
          publishedAt
          slug {
            current
          }
        }
      }
    }
    categories: allSanityCategory(filter:{projectFilter:{eq:true}}) {
      edges {
        node {
          title
          id
          slug {
            current
          }
        }
      }
    }
  }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.projects || {}).edges || []

  projectEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/project/${slug}/`

      reporter.info(`Creating project page: ${path}`)

      createPage({
        path,
        component: require.resolve('./src/templates/project.js'),
        context: {id}
      })
    });
  
    const postEdges = (result.data.posts || {}).edges || []

  postEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/post/${slug}/`

      reporter.info(`Creating post: ${path}`)

      createPage({
        path,
        component: require.resolve('./src/templates/post.js'),
        context: {id}
      })
    });

  const categoriesEdges = (result.data.categories || {}).edges || [];

  categoriesEdges
  .forEach(edge => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/archive/${slug}/`

    reporter.info(`Creating tag page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/category.js'),
      context: {id}
    })
  });
}

exports.createPages = async ({graphql, actions, reporter}) => {
  await createProjectPages(graphql, actions, reporter)
}
