import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Post from "../components/post";

export const query = graphql`
query PostTemplateQuery($id: String!) {
    post: sanityPost(id: {eq: $id}) {
      id
      title
      subtitle
      _rawContent
      categories {
        title
      }
      publishedAt
      _updatedAt
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
    }
  }
`;

const PostTemplate = props => {
    const { data, errors } = props;
    const post = data && data.post;

    return (
        <Layout>
            {errors && <SEO title="GraphQL Error" />}
            {post && <SEO title={post.title || "Untitled"} />}

            {errors && (
                <Container>
                    <GraphQLErrorList errors={errors} />
                </Container>
            )}
            {post && <Post {...post} />}
        </Layout>
    );
};

export default PostTemplate;
