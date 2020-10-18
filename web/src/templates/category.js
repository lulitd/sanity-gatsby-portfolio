import React from "react";
import Layout from "../containers/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import Container from "../components/container";
import CategoryLinkList from "../components/category-link-list";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import ProjectPreviewGrid from "../components/project-preview-grid";
import {Styled} from 'theme-ui';
export const query = graphql`
  query CategoryTemplateQuery($id: String!) {
    category: sanityCategory(id: { eq: $id }) {
      id
      title
    }
    allProjects: allSanityProject(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      totalCount
    }
    projects: allSanityProject(filter: { categories: { elemMatch: { id: { eq: $id } } }, publishedAt: { ne: null } }) {
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
    usedCategories: allSanityProject(
      sort: { fields: [publishedAt], order: DESC }
     filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
   ) {
     group(field: categories___title) {
       totalCount
       fieldValue
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

  const usedCategories = data && data.usedCategories;
  const totalCount = data && data.allProjects && data.allProjects.totalCount;

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
        <Styled.h1 sx={{ py:1 }} >{`Projects #${category.title}`}</Styled.h1>
        <CategoryLinkList
          categories={categoryNodes}
          currentCategory={category}
          all={true}
          used={usedCategories}
          total = {totalCount}
        />
        {projectNodes && projectNodes.length > 0 && <ProjectPreviewGrid nodes={projectNodes} />}
      </Container>
    </Layout>
  );
};

export default CategoryTemplate;
