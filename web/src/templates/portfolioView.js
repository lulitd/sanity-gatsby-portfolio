import React from "react";
import { graphql } from "gatsby";
import { Box, Heading, Text, Flex } from "theme-ui";

import Container from "../components/container";
import ProjectPreviewGrid from "../components/project/project-preview-grid";
import ThemedLink from "../components/atoms/ThemedLink";
import SanityMediaCarousel from "../components/atoms/sanityMediaCarousel";
import GraphQLErrorList from "../components/graphql-error-list";
import { SEO } from "../components/seo";
import ProjectSection from "../components/project/projectSection";
import PortableTextRenderer from "../components/sanity/portable-text-renderer";
import SanityImage from "../components/atoms/image";
import AnimWebBanner from "../animIcons/animWebBanner";
const PortfolioViewPage = ({ data, errors }) => {
  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }

  const view = data?.view;

  if (!view) return null;

  const projects = (view.projects ?? []).filter(Boolean);
  const gallery = view._rawGallery;
  const hasGallery = (gallery?.slides?.length ?? 0) > 0;

  const jumboImage = data?.site?.jumboImage;

  return (
    <Container as="main">
      {/* Curated introduction */}
      <Container as="header" sx={{ py: [5, 6, 7], position: "relative" }}>
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
        <Text
          sx={{
            display: "block",
            color: "text",
            fontWeight: "bold",
            fontSize: 2,
            mb: 2,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Lalaine Ulit-Destajo
        </Text>

        <Heading as="h1" sx={{ mb: 4 }}>
          {view.headline || view.title}
        </Heading>

        {view._rawDescription && (
          <Box>
            <PortableTextRenderer
              value={view._rawDescription || []}
              style={{ "& p": { maxWidth: ["50ch", "50ch", "60ch"], textWrap: "pretty", mb: 3 } }}
            />
          </Box>
        )}

        {/* Glitch portrait */}
        {jumboImage?.asset && (
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              zIndex: -1000,

              display: ["none", "none", "block"],
              // Gradually increase image size
              width: [0, 0, "min(50%, 450px)"],

              // Anchor the image to the right
              right: ["-3%", "0%", "-5%"],

              // Position relative to the center of the hero
              top: ["30%", "60%", "55%"],
              transform: ["none", "translateY(-50%)", "translateY(-50%)"],

              // Maintain a subtle background treatment
              opacity: [0.3, 0.3, 0.3],

              pointerEvents: "none",

              maskImage:
                "linear-gradient(to right, transparent 0%, black 50%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 50%, black 85%, transparent 100%)",
            }}
          >
            <SanityImage
              image={jumboImage}
              variant="hero"
              imgStyle={{
                objectFit: "contain",
                transform: "scaleX(-1)",
              }}
              sx={{ width: "100%" }}
            />
          </Box>
        )}
      </Container>

      {(view.skills?.length > 0 || view.tools?.length > 0) && (
        <Box
          as="section"
          sx={{
            py: [5, 6],
            borderTop: "1px solid",
            borderColor: "primary",
          }}
        >
          <Heading as="h2" sx={{ mb: 4 }}>
            Skills & Tools
          </Heading>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: ["1fr", "1fr 1fr"],
              gap: [4, 5],
            }}
          >
            {view.skills?.length > 0 && (
              <Box>
                <Heading as="h4" sx={{ color: "secondary", mb: 3, fontSize: [3, 3, 3] }}>
                  Capabilities
                </Heading>
                {view.skills.map((skill) => (
                  <Text key={skill} sx={{ display: "block", mb: 2 }}>
                    {skill}
                  </Text>
                ))}
              </Box>
            )}

            {view.tools?.length > 0 && (
              <Box>
                <Heading as="h4" sx={{ color: "secondary", mb: 3, fontSize: [3, 3, 3] }}>
                  Tools & Software
                </Heading>
                {view.tools.map((tool) => (
                  <Text key={tool} sx={{ display: "block", mb: 2 }}>
                    {tool}
                  </Text>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Ordered projects */}
      {projects.length > 0 && (
        <Box sx={{ mb: [5, 6] }}>
          <ProjectPreviewGrid nodes={projects} title="Highlighted Projects" />
        </Box>
      )}

      {hasGallery && (
        <Box sx={{ mb: [5, 6] }}>
          <SanityMediaCarousel
            variant="thumbnails"
            value={view._rawGallery}
            height={["320px", "400px", "400px"]}
          />
        </Box>
      )}

      <Flex
        my={8}
        mx={["-24px", "auto"]}
        sx={{
          width: ["100vw", "auto"],
          overflow: "hidden",
          justifyContent: "center",
          "& svg": {
            width: ["900px", "100%"],
            maxWidth: "none",
            height: "auto",
            flexShrink: 0,
          },
        }}
      >
        <AnimWebBanner />
      </Flex>
      {/* Closing CTA */}
      <Box
        as="section"
        sx={{
          py: [5, 6],
          borderTop: "1px solid",
          borderColor: "primary",
        }}
      >
        <Heading as="h2" sx={{ mb: 4 }}>
          Let's Build Something Together
        </Heading>

        {view._rawClosingMessage && (
          <Box sx={{ mb: 6 }}>
            <PortableTextRenderer
              value={view._rawClosingMessage}
              style={{ "& p": { maxWidth: ["55ch", "60ch", "100%"], textWrap: "pretty", mb: 3 } }}
            />
          </Box>
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
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      jumboImage {
        asset {
          gatsbyImageData(fit: FILLMAX, placeholder: NONE, width: 600)
          title
          altText
        }
        hotspot {
          x
          y
        }
      }
    }
    view: sanityPortfolioView(id: { eq: $id }) {
      id
      title
      headline
      _rawDescription(resolveReferences: { maxDepth: 5 })
      _rawClosingMessage(resolveReferences: { maxDepth: 5 })
      _rawGallery(resolveReferences: { maxDepth: 5 })
      skills
      tools
      projects {
        _id
        title
        subtitle
        excerpt
        publishedAt
        slug {
          current
        }
        thumbImage {
          asset {
            gatsbyImageData(width: 900, placeholder: BLURRED)
            altText
          }
        }
      }
    }
  }
`;

export const Head = ({ data, location }) => (
  <SEO title={data?.sanityPortfolioView?.title || "Selected Work"} pathname={location.pathname} />
);
