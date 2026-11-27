const { isFuture, parseISO, format } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const todayDate = format(new Date(), "yyyy-MM-dd");
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

async function createPortfolioViewPages(graphql, actions, reporter) {
  const { createPage } = actions;

  const result = await graphql(`
    query PortfolioViewPagesQuery {
      portfolioViews: allSanityPortfolioView(filter: { slug: { current: { ne: null } } }) {
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading curated portfolio views", result.errors);
    return;
  }

  const portfolioViews = result.data?.portfolioViews?.nodes ?? [];

  portfolioViews.forEach((view) => {
    const { id, slug, title } = view;

    if (!slug?.current) return;

    const path = `/for/${slug.current}/`;

    reporter.info(`Creating portfolio view: ${path}`);

    createPage({
      path,
      component: require.resolve("./src/templates/portfolioView.js"),
      context: {
        id,
      },
    });
  });

  reporter.info(`Created ${portfolioViews.length} curated portfolio pages`);
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await Promise.all([
    createProjectPages(graphql, actions, reporter),
    createPortfolioViewPages(graphql, actions, reporter),
  ]);
};

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();
  const componentQuery = /[?&]component(?:&|$)/;

  const excludeSvgComponents = (rules = []) => {
    rules.forEach((rule) => {
      if (!rule || typeof rule !== "object") return;

      if (rule.test instanceof RegExp && rule.test.test("image.svg")) {
        rule.resourceQuery = rule.resourceQuery
          ? {
              and: [rule.resourceQuery, { not: [componentQuery] }],
            }
          : { not: [componentQuery] };
      }

      if (rule.oneOf) excludeSvgComponents(rule.oneOf);
      if (rule.rules) excludeSvgComponents(rule.rules);
    });
  };

  excludeSvgComponents(config.module.rules);

  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    resourceQuery: componentQuery,
    type: "javascript/auto",
    use: [
      {
        loader: require.resolve("@svgr/webpack"),
        options: {
          exportType: "named",
          namedExport: "ReactComponent",
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: "prefixIds",
                params: {
                  delim: "__",
                  prefixIds: true,
                  prefixClassNames: true,
                },
              },
            ],
          },
        },
      },
    ],
  });

  actions.replaceWebpackConfig(config);
};
