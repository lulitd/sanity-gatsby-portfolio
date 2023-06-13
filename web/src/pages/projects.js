import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import { SEO } from "../components/seo";
import Layout from "../containers/layout";
import CategoryLinkList from "../components/category-link-list";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { Styled, Heading } from "theme-ui";
import { FaCentercode } from "react-icons/fa";
import { Themed } from "@theme-ui/mdx";

export const query = graphql`
  query ArchivePageQuery {
    archive: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      archive {
        _id
        title
      }
    }

    projects: allSanityProject(
      sort: { publishedAt: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      totalCount
      edges {
        node {
          _id
          mainImage {
            ...ImageWithPreview
          }
          thumbImage {
            ...ImageWithPreview
          }
          title
          subtitle
          categories {
            title
          }
          slug {
            current
          }
        }
      }
    }

    usedCategories: allSanityProject(
      sort: { publishedAt: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      group(field: { categories: { title: SELECT } }) {
        totalCount
        fieldValue
      }
    }
    categories: allSanityCategory(filter: { projectFilter: { eq: true } }, sort: { title: ASC }) {
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

  const archiveOrder = data && data.archive.archive;

  return (
    <Layout>
      <Container
        sx={{
          textAlign: "center"
        }}
      >
        <Heading as="h1">Projects</Heading>
        <CategoryLinkList
          categories={categoryNodes}
          currentCategory={{ title: "All" }}
          all={true}
          total={totalCount}
          used={usedCategories}
        />
        {projectNodes && projectNodes.length > 0 && (
          <ProjectPreviewGrid nodes={projectNodes} order={archiveOrder} />
        )}
      </Container>
    </Layout>
  );
};

export default ArchivePage;

export const Head = () => <SEO title="All Projects" />;
