const { isFuture, parseISO, format } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions;
  // const todayDate = format(new Date(), "yyyy-MM-ddThh:mm:ss");
  const todayDate = "2024-07-07T01:05:00.000Z";
  console.log(todayDate);
  const result = await graphql(`
    query IndexPageQuery {
      projects: allSanityProject(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
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
      posts: allSanityPost(filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }) {
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
      categories: allSanityCategory(filter: { slug: { current: { ne: null } } }) {
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
  `);

  if (result.errors) throw result.errors;

  const projectEdges = (result.data.projects || {}).edges || [];

  projectEdges
    .filter((edge) => !isFuture(parseISO(edge.node.publishedAt)))
    .forEach((edge) => {
      const id = edge.node.id;
      const slug = edge.node.slug.current;
      const path = `/project/${slug}/`;

      reporter.info(`Creating project pages: ${path} ${todayDate}`);

      createPage({
        path,
        component: require.resolve("./src/templates/project.js"),
        context: {
          id,
          currentDate: todayDate,
        },
      });
    });

  const postEdges = (result.data.posts || {}).edges || [];

  postEdges
    .filter((edge) => !isFuture(parseISO(edge.node.publishedAt)))
    .forEach((edge) => {
      const id = edge.node.id;
      const slug = edge.node.slug.current;
      const path = `/post/${slug}/`;

      reporter.info(`Creating posts: ${path}`);

      createPage({
        path,
        component: require.resolve("./src/templates/post.js"),
        context: { id, currentDate: todayDate },
      });
    });

  const categoriesEdges = (result.data.categories || {}).edges || [];

  categoriesEdges.forEach((edge) => {
    const id = edge.node.id;
    const slug = edge.node.slug.current;
    const path = `/projects/category/${slug}/`;

    reporter.info(`Creating category pages: ${path}`);

    createPage({
      path,
      component: require.resolve("./src/templates/category.js"),
      context: { id, currentDate: todayDate },
    });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createProjectPages(graphql, actions, reporter);
};
