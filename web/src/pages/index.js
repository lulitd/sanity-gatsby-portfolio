import React from "react";
import { graphql, Link } from "gatsby";
import {
  useThemeUI,
  Image,
  AspectRatio,
  AspectImage,
  Grid,
  Button,
  Heading,
  Text,
  Flex,
  Box,
} from "theme-ui";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
  buildImageObj,
} from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { Themed } from "@theme-ui/mdx";
import { lighten, alpha } from "@theme-ui/color";
import SanityImage from "gatsby-plugin-sanity-image";
import Layout from "../containers/layout";
import { SEO } from "../components/seo";
import Container from "../components/container";
import SocialsFromBio from "../components/socials-from-bio";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import ThemedLink from "../components/ThemedLink";
import PostPreviewGrid from "../components/post-preview-grid";
import LogoScroller from "../components/logo-scroller";
import Doodles from "../components/doodle";
import Icon from "../components/icon";
import CardRow from "../components/card-row";
import StatusPill from "../components/status-pill";

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
        ...ImageWithPreview
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
          ...ImageWithPreview
          asset {
            altText
            description
          }
        }
      }
    }
    projects: allSanityProject(
      limit: 6
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null }, featured: { eq: true } }
    ) {
      edges {
        node {
          publishedAt
          _id
          mainImage {
            ...ImageWithPreview
          }
          thumbImage {
            ...ImageWithPreview
          }
          title
          subtitle
          excerpt
          categories {
            title
          }
          slug {
            current
          }
        }
      }
    }
    posts: allSanityPost(limit: 4, sort: { publishedAt: DESC }) {
      edges {
        node {
          _id
          title
          subtitle
          publishedAt
          _updatedAt
          slug {
            current
          }
          author {
            name
          }
          categories {
            title
          }
          mainImage {
            ...ImageWithPreview
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
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
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
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const author = (site || {}).author;
  if (!author) {
    throw new Error(
      'Missing author in "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const context = useThemeUI();
  const { colors } = context.theme;
  const bg = createHeroBG(colors);

  return (
    <Layout>
      <Container
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            position: "absolute",
            inset: 0,
            "&::after": {
              content: '""',
              position: "absolute",
              zIndex: -1,
              inset: 0,
              backgroundImage: (t) => `
              linear-gradient(
             60deg,
              ${alpha("background", 1)(t)} 0%,
              ${alpha("background", 0.75)(t)} 25%,
              ${alpha("background", 0.9)(t)}40%,
              ${alpha("background", 0.5)(t)}60%,
              ${alpha("background", 0.75)(t)}80%,
              ${alpha("background", 1)(t)} 100%
            )
          `,
            },
          }}
        >
          {bg}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            my: [1, 2, 3],
            pt: [2, 4, 4],
          }}
        >
          <Text
            sx={{
              opacity: 0.7,
              textWrap: "balance",
              lineHeight: "1.25rem",
              textTransform: "uppercase",
              color: "primary600",
            }}
          >
            {site.jumboDescription}
          </Text>
          <Heading sx={{ my: [2, 2, 1], textWrap: "balance" }}>{site.jumboTag}</Heading>
          <Box
            sx={{
              mt: 3,
              mb: [2, 4, 4],
              "& a": {
                mr: 3,
                display: "inline-block",
              },
            }}
          >
            <ThemedLink to="/contact" variant="fillBtn" fontSize={2}>
              Let's Chat!
            </ThemedLink>
            <ThemedLink to="/projects" variant="outlineBtn" fontSize={2}>
              View Projects
            </ThemedLink>
          </Box>
        </Box>
      </Container>

      <Container>
        <LogoScroller
          logos={featuredLogos}
          title={"Clients & projects I've had the pleasure of working with"}
          logoHeight={30}
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
            browseMoreHref="/projects/"
          />
        </Container>
      )}
      <Container sx={{ my: 4 }}>
        <CardRow />
      </Container>
      {postNodes && postNodes.length > 0 && (
        <Container mb={5}>
          <Heading as="h3" id="featured-posts" fontSize={[8]}>
            Latest Posts
          </Heading>
          <PostPreviewGrid columns={[1, 2, 1]} nodes={postNodes} browseMoreHref="/posts/" />
        </Container>
      )}

      <Container>
        <Grid columns={["none", "none", "1.25fr 2fr"]} gap={3} mb={3}>
          {profileImage && profileImage.asset && (
            <Flex
              sx={{
                display: ["none", "none", "flex"],
              }}
            >
              <SanityImage
                {...profileImage}
                width={250}
                height={250}
                alt={profileImage.asset.altText}
                sx={{
                  backgroundColor: "transparent",
                  border: "solid currentColor",
                  borderWidth: 1,
                  borderRadius: "default",
                  color: "primary",
                  objectFit: "cover",
                  maxWidth: "100%",
                }}
              />
            </Flex>
          )}
          <Box mx="auto">
            <StatusPill
              currentStatus={site.statusAvailablity}
              message={site.statusMessage}
              contactInfo={site.contactEmail}
            />
            <Heading as="h3" sx={{ my: 0, pt: 3 }}>
              Hi, I'm Lalaine
            </Heading>
            <Box sx={{ maxWidth: "70ch", textWrap: "balance" }}>
              <p>
                I'm a creative technologist based in Toronto, Canada.
                <em>What does that mean?</em>
              </p>
              <p>
                I help bridge the gap between <b>Design ⇄ Development.</b>
              </p>
              <p>
                I specialize in crafting websites, apps and games. Think of me as your future Swiss
                Army Knife. I can wear multiple hats to help bring your vision to life.
              </p>
              <p>
                I've been fortunate enough to collaborate with new artists to established veterans,
                and startups to multinational corporations. I have designed and developed projects
                that have been shown in museums, galleries, festivals, and tradeshows all over the
                world.
              </p>
            </Box>
            <Box
              sx={{
                "& a": {
                  mr: 2,

                  display: "inline-block",
                },
              }}
            >
              <ThemedLink to="/contact" variant="fillBtn" fontSize={1}>
                Let's chat
              </ThemedLink>
              <ThemedLink to="/about" variant="outlineBtn" fontSize={1}>
                Get To Know Me
              </ThemedLink>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <SEO />;
