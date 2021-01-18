import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
// import Layout from "../containers/layout";
import CategoryLinkList from "../components/category-link-list";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { Styled, jsx } from "theme-ui";
import PostPreviewGrid from "../components/post-preview-grid";

//@jsx jsx
export const query = graphql`
  query PostPageQuery {
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      totalCount
      edges {
        node {
          _id
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
      <>
        <GraphQLErrorList errors={errors} />
      </>
    );
  }
  const postNodes =
    data && data.posts && mapEdgesToNodes(data.posts).filter(filterOutDocsWithoutSlugs);

  return (
    <>
      <SEO title="Posts" />
      <Container>
        
        <Styled.h1 sx={{ py: 1 }}>All Posts</Styled.h1>
        {postNodes && postNodes.length > 0 && <PostPreviewGrid nodes={postNodes} columns={[1]} />}
      </Container>
    </>
  );
};

export default ArchivePage;
