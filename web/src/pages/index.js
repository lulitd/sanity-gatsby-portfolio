import React from "react";
import { graphql } from "gatsby";
import { useThemeUI, Grid, Heading, Text, Paragraph, Flex, Box, Card } from "theme-ui";
import { alpha } from "@theme-ui/color";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from "../lib/helpers";
import { motion, useReducedMotion } from "framer-motion";
// import SanityImage from "gatsby-plugin-sanity-image";
import { SEO } from "../components/seo";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project/project-preview-grid";
import ThemedLink from "../components/atoms/ThemedLink";
import PostPreviewGrid from "../components/post-preview-grid";
import LogoScroller from "../components/home/logo-scroller";
import Doodles from "../components/home/doodle";
import CardRow from "../components/home/card-row";
import StatusPill from "../components/status-pill";
import SanityImage from "../components/atoms/image";
import WorkingApproach from "../components/home/work-approach";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      jumboName
      jumboDescription
      jumboTag
      statusAvailablity
      statusMessage
      contactEmail
      featuredLogos {
        asset {
          gatsbyImageData(fit: SCALE, placeholder: BLURRED, height: 50)
          title
          altText
        }
        hotspot {
          x
          y
        }
      }
      archive {
        _id
        title
      }
      author {
        github
        instagram
        twitter
        linkedin
        name
        image {
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
      }
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
    projects: allSanityProject(
      limit: 4
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null }, featured: { eq: true } }
    ) {
      edges {
        node {
          publishedAt
          _id
          mainImage {
            asset {
              gatsbyImageData(fit: MIN, placeholder: BLURRED, width: 500)
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
              gatsbyImageData(fit: FILLMAX, placeholder: BLURRED, width: 500)
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
          excerpt
          roles {
            fieldTitle
            fieldInfo
          }
          categories {
            title
          }
          slug {
            current
          }
        }
      }
    }
  }
`;

const createHeroBG = (colors) => {
  return <Doodles colors={colors} />;
};

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }

  const site = (data || {}).site;
  const archiveOrder = (site || {}).archive;

  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  const profileImage = site.author.image;
  const featuredLogos = site.featuredLogos;
  const jumboImage = site.jumboImage;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  const author = (site || {}).author;
  if (!author) {
    throw new Error(
      'Missing author in "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  const context = useThemeUI();
  const { colors } = context.theme;

  const reduceMotion = useReducedMotion();

  return (
    <>
      <Container
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            minHeight: ["auto", "auto", "min(78vh, 820px)"],
            py: [5, 6, 7],
            isolation: "isolate",
          }}
        >
          {/* Glitch portrait */}
          {jumboImage?.asset && (
            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                zIndex: 0,

                // Gradually increase image size
                width: ["min(50%, 360px)", "min(48%, 440px)", "min(52%, 900px)"],

                // Anchor the image to the right
                right: ["-3%", "-4%", "-5%"],

                // Position relative to the center of the hero
                top: ["30%", "50%", "55%"],
                transform: ["none", "translateY(-50%)", "translateY(-50%)"],

                // Maintain a subtle background treatment
                opacity: [0.5, 0.45, 0.5],

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

          {/* Main content */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              textAlign: "left",
            }}
          >
            <Text
              sx={{
                display: "block",
                mb: 4,
                fontSize: [0, 1, 2],
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "primary600",
                overflowWrap: "break-word",
              }}
            >
              {site.jumboDescription}
            </Text>

            <Heading
              as="h1"
              sx={{
                position: "relative",

                fontSize: [
                  "clamp(2rem, 9vw, 2.5rem)",
                  "clamp(2.5rem, 5.5vw, 3.25rem)",
                  "clamp(3.5rem, 5vw, 3.75rem)",
                ],
                lineHeight: 1.05,
                letterSpacing: "-0.06em",
                fontWeight: 100,
                textTransform: "uppercase",
                color: "primary",

                textWrap: "balance",
                overflowWrap: "break-word",
                maxWidth: ["18ch", "18ch", "19ch"],

                my: 0,
              }}
            >
              {site.jumboTag}
            </Heading>

            <Flex
              sx={{
                flexWrap: "wrap",
                maxWidth: ["320px", "none", "none"],
                gap: 2,
                justifyContent: ["flex-start", null, null],
                mt: [4, 5],
              }}
            >
              <ThemedLink to="/projects" variant="fillBtn">
                View Selected Work
              </ThemedLink>

              <ThemedLink to="/contact" variant="outlineBtn">
                Get in Touch
              </ThemedLink>
            </Flex>

            <Text
              sx={{
                display: "block",
                mt: 3,
                fontSize: [0, 1],
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "subtitle",
                opacity: 0.8,
              }}
            >
              Toronto-based · Open to new opportunities
            </Text>
          </Box>
        </Box>
      </Container>

      <Container sx={{ my: 4 }}>
        <CardRow />
      </Container>

      <Container my={4}>
        <LogoScroller
          logos={featuredLogos}
          title={"Clients & projects I've had the pleasure of working with"}
          logoHeight={[50, 50, 40]}
          duration={60}
          backgroundColor="primary"
        />
      </Container>

      {projectNodes && projectNodes.length > 0 && (
        <Container>
          <ProjectPreviewGrid
            columns={[1, 2, null]}
            nodes={projectNodes}
            order={archiveOrder}
            title="Highlighted Projects"
            browseMoreHref="/projects/"
          />
        </Container>
      )}

      <Container>
        <Grid
          columns={[1, 1, "minmax(0, 3fr) minmax(0, 7fr)"]}
          gap={[3, 4, 5]}
          sx={{
            alignItems: "start",
            py: [5, 6, 7],
          }}
        >
          {/* Portrait */}
          {profileImage?.asset && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: ["240px", "360px", "none"],
                mx: ["auto", "auto", 0],
                my: [2, 3, 0],
                isolation: "isolate",
                order: [1, 1, 0],
              }}
            >
              {/* Offset decorative frame */}
              <Box
                aria-hidden="true"
                sx={{
                  position: "absolute",
                  inset: 0,
                  border: "1px solid",
                  borderColor: "primary",
                  transform: "translate(12px, 12px)",
                  zIndex: -1,
                  pointerEvents: "none",
                }}
              />

              {/* Image */}
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: ["1/1", "1/1", "4 / 5"],
                  overflow: "hidden",
                  bg: "background",
                }}
              >
                <SanityImage
                  image={profileImage}
                  fill
                  sx={{
                    width: "100%",
                    height: "100%",
                    filter: "grayscale(100%)",
                    transition: "filter 0.4s ease",
                    "&:hover": {
                      filter: "grayscale(0%)",
                    },
                  }}
                />
              </Box>

              {/* Image annotation */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -2,
                  left: 2,
                  px: 2,
                  py: 2,
                  bg: "darkest",
                  border: "1px solid",
                  borderColor: "primary",
                }}
              >
                <Text
                  sx={{
                    fontSize: 0,
                    color: "primary",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {"<"}The human behind the code{"/>"}
                </Text>
              </Box>
            </Box>
          )}

          {/* Biography */}
          <Box
            sx={{
              mx: ["auto", "auto", "auto"],
              px: [2, 3, 4],
              //pb: [4, 4, 5],
            }}
          >
            <Heading
              as="h2"
              sx={{
                fontSize: [5, 6, 7],
                lineHeight: 1.1,
                mb: 4,
              }}
            >
              Hi, I'm Lalaine!
            </Heading>

            <Flex
              sx={{
                maxWidth: ["60ch", "55ch", "55ch"],

                flexDirection: "column",
                gap: 3,
                mb: 4,
                textWrap: "pretty",
              }}
            >
              <Paragraph>
                I'm a Toronto-based multidisciplinary creative working across design, motion, and
                technology.
              </Paragraph>
              <Paragraph>
                I enjoy bridging the gap between creative vision and technical execution, turning
                ambitious ideas into thoughtful, engaging work. Whether I'm designing, editing,
                coding, or troubleshooting, I love solving problems and helping the people around me
                bring their ideas to life.
              </Paragraph>
              <Paragraph>
                From early experiments to finished projects, I'm always looking for ways to make
                creative work more meaningful, memorable, and a little unexpected.
              </Paragraph>
            </Flex>

            <Flex sx={{ flexWrap: "wrap", gap: 2 }}>
              <ThemedLink to="/about" variant="outlineBtn">
                More about me
              </ThemedLink>
              <ThemedLink to="/" variant="fillBtn">
                View resume
              </ThemedLink>
            </Flex>
          </Box>
        </Grid>
      </Container>

      <WorkingApproach />
    </>
  );
};

export default IndexPage;

export const Head = ({ location }) => <SEO pathname={location.pathname} />;
