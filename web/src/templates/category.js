import React from "react";
import Layout from "../containers/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import Container from "../components/container";
import { responsiveTitle1 } from "../components/typography.module.css";
import CategoryLinkList from "../components/category-link-list";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import ProjectPreviewGrid from "../components/project-preview-grid";

export const query = graphql`
  query CategoryTemplateQuery($id: String!) {
    category: sanityCategory(id: { eq: $id }) {
      id
      title
    }
    projects: allSanityProject(filter: { categories: { elemMatch: { id: { eq: $id } } } }) {
      edges {
        node {
          id
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
          subtitle
          slug {
            current
          }
        }
      }
    }
    categories: allSanityCategory(
      filter: { projectFilter: { eq: true } }
      sort: { fields: title, order: ASC }
    ) {
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
`;

const CategoryTemplate = props => {
  const { data, errors } = props;
  const category = data && data.category;

  const categoryNodes = data && data.categories && mapEdgesToNodes(data.categories);

  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs);

  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {category && <SEO title={category.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      <SEO title={`Archive: ${category.title}`} />
      <Container>
        <h1 className={responsiveTitle1}>{`Projects #${category.title}`}</h1>
        <CategoryLinkList categories={categoryNodes} currentCategory={category} all={true} />
        {projectNodes && projectNodes.length > 0 && <ProjectPreviewGrid nodes={projectNodes} />}
      </Container>
    </Layout>
  );
};

export default CategoryTemplate;
