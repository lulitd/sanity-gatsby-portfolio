import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import CategoryLinkList from "../components/category-link-list";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

import { responsiveTitle1 } from "../components/typography.module.css";

export const query = graphql`
  query ArchivePageQuery {
    projects: allSanityProject(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      totalCount
      edges {
        node {
          id
          mainImage {
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

const ArchivePage = props => {
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs);
  
    const totalCount = data && data.projects && data.projects.totalCount;

  const categoryNodes = data && data.categories && mapEdgesToNodes(data.categories);

  const usedCategories = data && data.usedCategories;
  return (
    <Layout>
      <SEO title="Archive" />
      <Container>
  <h1 className={responsiveTitle1}>Projects #All</h1>
        <CategoryLinkList
          categories={categoryNodes}
          currentCategory={{ title: "All" }}
          all={true}
          total = {totalCount}
          used={usedCategories}
        />
        {projectNodes && projectNodes.length > 0 && <ProjectPreviewGrid nodes={projectNodes} />}
      </Container>
    </Layout>
  );
};

export default ArchivePage;
