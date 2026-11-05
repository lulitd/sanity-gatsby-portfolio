import React from "react";
import { graphql } from "gatsby";
import { Box, Heading, Text } from "theme-ui";

import Container from "../components/container";
import ProjectPreviewGrid from "../components/project/project-preview-grid";
import ThemedLink from "../components/atoms/ThemedLink";
import GraphQLErrorList from "../components/graphql-error-list";
import { SEO } from "../components/seo";

const PortfolioViewPage = ({ data, errors }) => {
  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }

  const view = data?.sanityPortfolioView;

  if (!view) return null;

  const projects = (view.projects ?? []).filter(Boolean);

  return (
    <Container as="main">
      {/* Curated introduction */}
      <Box as="header" sx={{ py: [5, 6, 7] }}>
        <Text
          sx={{
            display: "block",
            color: "secondary",
            mb: 3,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Selected Work / {view.title}
        </Text>

        <Heading as="h1" sx={{ mb: 4 }}>
          {view.headline || view.title}
        </Heading>

        {view.description && (
          <Text
            as="p"
            sx={{
              maxWidth: "65ch",
              lineHeight: 1.65,
            }}
          >
            {view.description}
          </Text>
        )}
      </Box>

      {/* Ordered projects */}
      {projects.length > 0 && (
        <Box sx={{ mb: [5, 6] }}>
          <ProjectPreviewGrid nodes={projects} />
        </Box>
      )}

      {/* Closing CTA */}
      <Box
        sx={{
          py: [5, 6],
          textAlign: "center",
          borderTop: "1px solid",
          borderColor: "primary",
        }}
      >
        {view.closingMessage && (
          <Text as="p" sx={{ maxWidth: "60ch", mx: "auto", mb: 4 }}>
            {view.closingMessage}
          </Text>
        )}

        <ThemedLink to="/contact" variant="fillBtn">
          Get in Touch
        </ThemedLink>
      </Box>
    </Container>
  );
};

export default PortfolioViewPage;

export const query = graphql`
  query PortfolioViewById($id: String!) {
    sanityPortfolioView(id: { eq: $id }) {
      id
      title
      headline
      description
      closingMessage

      projects {
        _id
        title
        subtitle
        publishedAt
        slug {
          current
        }
        mainImage {
          asset {
            gatsbyImageData(width: 900, placeholder: BLURRED)
            altText
          }
        }
      }
    }
  }
`;

export const Head = ({ data }) => (
  <SEO title={data?.sanityPortfolioView?.title || "Selected Work"} />
);
