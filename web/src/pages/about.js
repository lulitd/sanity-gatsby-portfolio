import React from "react";
import { graphql } from "gatsby";
import { Box, Heading, Grid, Text, Flex } from "theme-ui";
import { Link } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import { SEO } from "../components/seo";

import PortableTextRenderer from "../components/sanity/portable-text-renderer";
import SanityImage from "../components/atoms/image";
import SanityMediaCarousel from "../components/atoms/sanityMediaCarousel";
import AboutTimeline from "../components/aboutTimeline";
import EditorialHeader from "../components/atoms/editorialHeader";

export const query = graphql`
  query AboutQuery {
    about: sanityAboutPage(_id: { eq: "aboutPage" }) {
      _id

      # 01. Introduction
      heroHeading
      heroLabel
      heroIntro

      heroPortrait {
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

      # 02. Journey & Accolades
      timelineHeading
      timelineLabel
      timelineIntro

      accoladesHeading
      accolades {
        _id
        title
        date
        event
        address
        linkTo
        projects {
          _id
          title
          slug {
            current
          }
        }
      }

      # 04. Beyond the Work
      personalHeading
      personalLabel
      _rawPersonalDescription(resolveReferences: { maxDepth: 5 })
      _rawPersonalGallery(resolveReferences: { maxDepth: 5 })

      # SEO
      seoTitle
      seoDescription
    }

    allSanityMilestone(filter: { featured: { eq: true } }, sort: [{ year: ASC }, { order: ASC }]) {
      nodes {
        _id
        title
        year
        dateTitle
        category
        description
        order
        link

        image {
          asset {
            gatsbyImageData(width: 600, placeholder: BLURRED)
            altText
          }
          hotspot {
            x
            y
          }
        }

        projects {
          _id
          title
          slug {
            current
          }
        }
      }
    }
  }
`;

// ----------------------------------------
// ABOUT PAGE
// ----------------------------------------
const AboutPage = ({ data, errors }) => {
  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }

  const about = data?.about;
  const milestones = data?.allSanityMilestone?.nodes ?? [];

  if (!about) {
    return (
      <Container>
        <Heading as="h1">About</Heading>
        <Text>About page content is not available yet.</Text>
      </Container>
    );
  }

  const {
    // Introduction
    heroHeading,
    heroLabel,
    heroIntro,
    heroPortrait,

    // Journey
    timelineHeading,
    timelineLabel,
    timelineIntro,
    accoladesHeading,
    accolades,

    // Personal
    personalHeading,
    personalLabel,
    _rawPersonalDescription,
    _rawPersonalGallery,
  } = about;

  return (
    <Container>
      {/* ==================================
          01. INTRODUCTION
      ================================== */}
      <Box as="section" sx={{ mb: 7 }}>
        <Grid columns={[1, 1, "2fr 1fr"]} gap={4}>
          <Box mx={["auto", "auto", 0]}>
            <EditorialHeader
              number="01"
              label={about.heroLabel || "INTRODUCTION"}
              title={about.heroHeading || "About"}
              description={about.heroIntro}
              as="h1"
              variant="hero"
            />
          </Box>

          <Box
            as="aside"
            sx={{
              placeItems: "center",
              display: ["none", null, "flex"],
            }}
          >
            {heroPortrait?.asset && (
              <SanityImage
                image={heroPortrait}
                className="gmap-secondary-primary"
                sx={{
                  minHeight: 0,
                  maxHeight: "100%",
                  backgroundColor: "transparent",
                  border: "solid currentColor",
                  borderWidth: 1,
                  borderRadius: "default",
                  color: "muted",
                  maxWidth: "100%",
                }}
              />
            )}
          </Box>
        </Grid>
      </Box>

      {/* ==================================
          02. JOURNEY & ACCOLADES
      ================================== */}
      <Box as="section" sx={{ mb: 7 }}>
        <EditorialHeader
          number="02"
          label={about.timelineLabel || "THE JOURNEY"}
          title={about.timelineHeading || "The Journey"}
          description={about.timelineIntro}
          descriptionWidth="100%"
        />

        <AboutTimeline milestones={milestones} />

        {accolades?.length > 0 && (
          <Box sx={{ mt: 6, mb: 8 }}>
            <Heading as="h3" sx={{ mb: 4, fontSize: [2, 3, 4] }}>
              {accoladesHeading || "Accolades"}
            </Heading>

            <Box as="ul" sx={{ listStyle: "none", p: 0 }}>
              {accolades.map((accolade) => (
                <Box
                  as="li"
                  key={accolade._id}
                  sx={{
                    py: 3,
                    borderTop: "1px solid",
                    borderColor: "muted",
                  }}
                >
                  <Text as="p" sx={{ fontWeight: "bold" }}>
                    {accolade.linkTo ? (
                      <a href={accolade.linkTo} target="_blank" rel="noopener noreferrer">
                        {accolade.title}
                      </a>
                    ) : (
                      accolade.title
                    )}
                  </Text>

                  <Text as="p" sx={{ fontSize: 1, mt: 1 }}>
                    {[accolade.date?.slice(0, 4), accolade.event, accolade.address]
                      .filter(Boolean)
                      .join(" · ")}
                  </Text>
                  {/* Related projects */}
                  {accolade.projects?.length > 0 && (
                    <Flex
                      sx={{
                        gap: 3,
                        flexWrap: "wrap",
                        mt: 1,
                      }}
                    >
                      {accolade.projects
                        .filter((project) => project?.slug?.current)
                        .map((project) => (
                          <Link
                            key={project._id}
                            to={`/project/${project.slug.current}/`}
                            sx={{
                              color: "secondary",
                              fontFamily: "monospace",
                              fontSize: 1,
                              textDecoration: "none",
                              borderBottom: "1px solid",
                              borderColor: "secondary",
                              pb: 1,
                              "&:hover": {
                                color: "primary",
                                borderColor: "primary",
                              },
                            }}
                          >
                            {project.title} ↗
                          </Link>
                        ))}
                    </Flex>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {/* ==================================
          04. BEYOND THE WORK
      ================================== */}
      <Box as="section" sx={{ mb: 7 }}>
        <EditorialHeader
          number="03"
          label={about.personalLabel || "BEYOND THE WORK"}
          title={about.personalHeading || "Beyond the Work"}
        />

        {_rawPersonalDescription?.length > 0 && (
          <PortableTextRenderer
            value={_rawPersonalDescription}
            style={{ "& p": { maxWidth: ["50ch", "75ch", "100%"], textWrap: "pretty", mb: 0 } }}
          />
        )}

        {_rawPersonalGallery?.slides?.length > 0 && (
          <SanityMediaCarousel value={_rawPersonalGallery} height={["225px", "250px", "275px"]} />
        )}
      </Box>
    </Container>
  );
};

export default AboutPage;

// ----------------------------------------
// SEO
// ----------------------------------------
export const Head = ({ data, location }) => (
  <SEO title={data?.about?.seoTitle || "About"} pathname={location.pathname} />
);
