import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import {SEO} from "../components/seo";
//import Layout from "../containers/layout";
import Post from "../components/post";

export const query = graphql`
  query PostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
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
        ...ImageWithPreview
      }
    }
  }
`;

const PostTemplate = (props) => {
  const { data, errors } = props;
  const post = data && data.post;

  return (
    <>
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {post && <Post {...post} />}
    </>
  );
};

export default PostTemplate;

export const Head = () => (
  <SEO title="Post" />
)
