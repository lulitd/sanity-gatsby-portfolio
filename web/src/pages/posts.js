import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import { SEO } from "../components/seo";
import Layout from "../containers/layout";
import CategoryLinkList from "../components/category-link-list";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { Themed } from "@theme-ui/mdx";
import PostPreviewGrid from "../components/post-preview-grid";
export const query = graphql`
  query PostPageQuery {
    posts: allSanityPost(
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
          title
          subtitle
          slug {
            current
          }
          categories {
            title
          }
          publishedAt
          _updatedAt
        }
      }
    }
  }
`;

const ArchivePage = (props) => {
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  const postNodes =
    data && data.posts && mapEdgesToNodes(data.posts).filter(filterOutDocsWithoutSlugs);

  return (
    <Layout>
      <Container>
        {!postNodes ||
          (postNodes.length <= 0 && (
            <>
              <Themed.h1 sx={{ py: 1 }}>Coming Soon</Themed.h1>
            </>
          ))}
        {postNodes && postNodes.length > 0 && <Themed.h1 sx={{ py: 1 }}>All Posts</Themed.h1>}
        {postNodes && postNodes.length > 0 && <PostPreviewGrid nodes={postNodes} columns={[1]} />}
      </Container>
    </Layout>
  );
};

export default ArchivePage;

export const Head = () => <SEO title="Blog" />;
