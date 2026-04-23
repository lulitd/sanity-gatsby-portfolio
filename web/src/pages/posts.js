import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import { SEO } from "../components/seo";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import PostPreviewGrid from "../components/post-preview-grid";
import { Heading } from "theme-ui";

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

const BlogPage = (props) => {
  const { data, errors } = props;
  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }
  const postNodes =
    data && data.posts && mapEdgesToNodes(data.posts).filter(filterOutDocsWithoutSlugs);

  return (
    <Container>
      {!postNodes ||
        (postNodes.length <= 0 && (
          <>
            <Heading as={"h2"} sx={{ py: 1 }}>
              Coming Soon
            </Heading>
          </>
        ))}
      {postNodes && postNodes.length > 0 && (
        <Heading as={"h2"} sx={{ py: 1 }}>
          All Posts
        </Heading>
      )}
      {postNodes && postNodes.length > 0 && <PostPreviewGrid nodes={postNodes} columns={[1]} />}
    </Container>
  );
};

export default BlogPage;

export const Head = () => <SEO title="Blog" />;
