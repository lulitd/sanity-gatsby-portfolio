import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import { SEO } from "../components/seo";

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
          asset {
            altText
          }
        }
        _id
        slug {
          current
        }
      }
      mainImage {
        ...ImageWithPreview
        asset {
          altText
        }
      }
      thumbImage {
        ...ImageWithPreview
        asset {
          altText
        }
      }
      title
      subtitle
      roles {
        fieldTitle
        fieldInfo
      }
      technologies {
        fieldTitle
        fieldInfo
      }
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
    <>
      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {project && <Project {...project} awards={awards} />}
    </>
  );
};

export default ProjectTemplate;

export const Head = ({ data }) => (
  <SEO title={`${data.project.title} — ${data.project.subtitle}`} />
);
