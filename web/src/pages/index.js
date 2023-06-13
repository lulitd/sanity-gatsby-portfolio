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
  Box
} from "theme-ui";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
  buildImageObj
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

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      jumboName
      jumboDescription
      jumboTag
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
      limit: 3
      sort: { endedAt: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null }, featured: { eq: true } }
    ) {
      edges {
        node {
          _id
          mainImage {
            ...ImageWithPreview
          }
          thumbImage {
            ...ImageWithPreview
          }
          title
          subtitle
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

const createHeroBG = colors => {
  return <Doodles colors={colors} />;
};

const IndexPage = props => {
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
          height: "85vh",
          height: "85svh",
          overflow: "hidden",
          backgroundImage: t => `
          radial-gradient(
            circle at 50% 25%,
            ${alpha("background", 1)(t)} 0%,
            ${alpha("background", 1)(t)} 25%,
            ${alpha("background", 0)(t)}40%,
            ${alpha("background", 1)(t)}60%,
            ${alpha("background", 1)(t)} 100%
          )
        `
        }}
      >
        {bg}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: ["0.25fr 3fr 0.25fr", "0.5fr 2fr 0.5fr", "0.5fr 2fr 0.5fr"],
            gridTemplateRows: ["0.125fr 1fr 0.125fr", "0.5fr 2fr 0.5fr", "0.5fr 1fr 0.5fr"],
            gridTemplateAreas: "'. . .' '. Header-Content .' '. . .'"
          }}
        >
          <Box
            sx={{
              gridArea: "Header-Content",
              textAlign: ["center", "center", "center"]
            }}
          >
            <Heading variant="subheading">
              Hi my name is
              <Text
                as="span"
                variant="title"
                sx={{
                  display: "block",
                  mt: 1,
                  mb: 4,
                  pt: [1]
                }}
              >
                {site.jumboName}.
              </Text>
            </Heading>
            <Heading variant="subheading">{site.jumboTag}</Heading>
            <Text
              sx={{
                display: "table",
                textAlign: "left",
                pt: 4,
                pb: 2,
                fontWeight: 300,
                fontSize: [1, 2, 3]
              }}
            >
              {site.jumboDescription}
            </Text>
            <Box
              pt={4}
              sx={{
                textAlign: "center",
                "& a": {
                  mr: 4,
                  mb: 2,
                  display: "inline-block"
                }
              }}
            >
              <ThemedLink to="/projects" variant="fillBtn" fontSize={2}>
                View Projects
              </ThemedLink>
              <ThemedLink to="/about" variant="outlineBtn" fontSize={2}>
                Get To Know Me
              </ThemedLink>
            </Box>
          </Box>
        </Box>
      </Container>

      <Container>
        <LogoScroller
          logos={featuredLogos}
          logoHeight={50}
          duration={60}
          backgroundColor="primary"
          mb={6}
        />
      </Container>

      <Container sx={{ minHeight: ["45svh"], display: "flex", placeItems: "center" }}>
        <Heading>
          I work with brands & agencies to create impactful and meaningful products.
        </Heading>
      </Container>
      <Container sx={{ mb: 6 }}>
        <CardRow />
      </Container>
      <Container>
        <Grid columns={["none", "none", "1fr 2fr"]} gap="2em">
          {profileImage && profileImage.asset && (
            <Flex
              sx={{
                display: ["none", "none", "flex"]
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
                  color: "third500",
                  objectFit: "cover",
                  maxWidth: "100%"
                }}
              />
            </Flex>
          )}
          <Box mx="auto">
            <Heading as="h3">Hello</Heading>

            <Box sx={{ maxWidth: "75ch" }}>
              <Themed.p
                sx={{
                  fontSize: [1, 2],
                  my: 0,
                  pb: 3
                }}
              >
                Hi, I'm Lalaine. Based in Toronto, Canada, I've been described as a
                jack-of-all-trades. I am a new media artist and software developer, but I am a
                storyteller at heart. I develop software that tells compelling stories and spark
                curiosity across many mediums and platforms. I have been able to tell stories of
                individuals and multinational corporations. I've designed and created projects
                exhibited in museums, galleries & festivals worldwide.
              </Themed.p>
            </Box>
            <SocialsFromBio
              bio={author}
              iconStyle={{
                m: [1]
              }}
              sx={{
                display: "flex",
                flexDirection: ["row", "row", "row"]
              }}
            />
            <Box
              pt={4}
              sx={{
                "& a": {
                  mr: 2,
                  mb: 2,
                  display: "inline-block"
                }
              }}
            >
              <Button
                variant="outlineBtn"
                as="a"
                href="../2022-CV-Lalaine-Ulit-Destajo.pdf"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                CV
              </Button>
              <ThemedLink to="/about" variant="outlineBtn" fontSize={1}>
                {" "}
                Get To Know Me{" "}
              </ThemedLink>
            </Box>
          </Box>
        </Grid>
      </Container>

      {projectNodes && projectNodes.length > 0 && (
        <Container my={4}>
          <Heading
            as="h3"
            sx={{
              textAlign: ["center", "center", "unset"]
            }}
            id="featured-projects"
          >
            Featured Projects
          </Heading>
          <ProjectPreviewGrid
            columns={[1, 2, null]}
            nodes={projectNodes}
            order={archiveOrder}
            browseMoreHref="/projects/"
          />
        </Container>
      )}

      {postNodes && postNodes.length > 0 && (
        <Container mb={5}>
          <Heading as="h3" id="featured-posts" fontSize={[8]}>
            Latest Posts
          </Heading>
          <PostPreviewGrid columns={[1, 2, 1]} nodes={postNodes} browseMoreHref="/posts/" />
        </Container>
      )}
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <SEO />;
