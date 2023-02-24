import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import {SEO} from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
        projectFilter
        slug {
          current
        }
      }
      accolades {
        _id
        date(formatString: "YYYY")
        title
        event
        linkTo
        address
      }
      relatedProjects {
        title
        subtitle
        categories {
          title
        }
        publishedAt
        mainImage {
          ...ImageWithPreview
        }
        _id
        slug {
          current
        }
      }
      mainImage {
        ...ImageWithPreview
      }
      thumbImage {
        ...ImageWithPreview
      }
      title
      subtitle
      github
      instagram
      twitter
      youtube
      website
      slug {
        current
      }
      _rawProjectBreakdown
      _rawProjectBrief
      members {
        _key
        person {
          website
          twitter
          linkedin
          github
          instagram
          image {
            ...ImageWithPreview
          }
          name
        }
        roles
      }
    }
    awards: allSanityAccolade(filter: { projects: { elemMatch: { id: { eq: $id } } } }) {
      edges {
        node {
          _id
          date(formatString: "YYYY")
          title
          event
          linkTo
          address
        }
      }
    }
  }
`;

const ProjectTemplate = (props) => {
  const { data, errors } = props;
  const project = data && data.project;

  let awards = [];

  data.awards.edges.forEach(function (obj) {
    awards.push(obj.node);
  });
 
  return (
    <Layout>

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {project && <Project {...project} awards={awards} />}
    </Layout>
  );
};

export default ProjectTemplate;

export const Head = () => (
  <SEO title="Project" />
)
