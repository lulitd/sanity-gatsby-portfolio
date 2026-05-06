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
          asset {
            gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
            title
            altText
          }
          hotspot {
            x
            y
          }
        }
        _id
        slug {
          current
        }
      }
      mainImage {
        asset {
          gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
          title
          altText
        }
        hotspot {
          x
          y
        }
      }
      thumbImage {
        asset {
          gatsbyImageData(fit: FILLMAX, placeholder: BLURRED, width: 450)
          title
          altText
        }
        hotspot {
          x
          y
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
      _rawProjectBreakdown(resolveReferences: { maxDepth: 10 })
      _rawProjectBrief(resolveReferences: { maxDepth: 10 })
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
