import React from "react";
import { graphql, Link } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { Heading, Text, Flex, Box } from 'rebass';
import { Styled, jsx, Image, AspectRatio } from 'theme-ui';
import ThemedLink from '../components/ThemedLink';
import { lighten } from "@theme-ui/color"
import PostPreviewGrid from "../components/post-preview-grid";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import { flip } from "ramda";

//@jsx jsx
export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      jumboName
      jumboDescription
      jumboTag
      author{
        name
        image {
          crop {
            _key
            _type
            top
            bottom
            left
            right
          }
          hotspot {
            _key
            _type
            x
            y
            height
            width
          }
          asset {
            _id
          }
          alt
        }
      }
    }
    projects: allSanityProject(limit: 6, sort: {fields: [endedAt], order: DESC}, filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}, featured: {eq: false}}) {
      edges {
        node {
          _id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          subtitle
          slug {
            current
          }
        }
      }
    }
    posts: allSanityPost(limit: 4, sort: {fields: [publishedAt], order: DESC}) {
      edges{
        node{
          _id
          title
          subtitle
          publishedAt
          _updatedAt
          slug{
            current
          }
          author{
            name
          }
          categories{
            title
          }
          mainImage{
              crop {
                _key
                _type
                top
                bottom
                left
                right
              }
              hotspot {
                _key
                _type
                x
                y
                height
                width
              }
              asset {
                _id
              }
              alt
          }
        }
      }
    }
  }
`;

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
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : [];

  const postNodes = (data || {}).posts ? mapEdgesToNodes(data.posts)
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

  const profileImage = author.image;

  return (
    <Layout mainStyle={{ display: "flex", flexDirection: 'column' }} >
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container my={2} px={4, 3} sx={{ display: 'flex', justifyContent: 'center', minHeight: ['calc(100vh - 81px)', 'calc(100vh - 92px)'] }}>
        <Flex flexDirection={'column'} justifyContent='center'>
          <Heading pb={0} variant='subheading' fontWeight='body' fontSize={[2, 3]}>Hi my name is
            <Text as='span' display="block" variant='title'>{site.jumboName}.</Text>
          </Heading>
          <Heading fontWeight='600' fontSize={[4, 6]}>{site.jumboTag} </Heading>
          <Text pt={3} pb={4} fontSize={[1, 2, 3]} width={[1, 0.75, 0.6]}>{site.jumboDescription}</Text>
          <Box pt={4} sx={{
            '& a': {
              mr: 2,
              mb: 2,
              display: 'inline-block'
            }
          }}>
            <ThemedLink block='true' to="/archive" variant='semiOutlineBtn' fontSize={2}>
              View Projects
      </ThemedLink>
            <ThemedLink block='true' to="/about" variant='outlineBtn' fontSize={2}>
              Get To Know Me
      </ThemedLink>
          </Box>
        </Flex>
        {/* <Flex width={'100%'} flexDirection={'column'} justifyContent='center' p={0}>
          <AspectRatio ratio={1}>
            <Image
              src={imageUrlFor(buildImageObj(profileImage))
                .fit("fill")
                .width(450)
                .height(450)
                .url()}
              sx={{
                maxWidth: '100%',
                borderRadius: 'pill',
                opacity: '33%'
              }}
              alt={profileImage.alt}
            />
          </AspectRatio>

        </Flex> */}
      </Container>
      {projectNodes && projectNodes.length > 0 && (
        <Container mb={5} px={4, 3} sx={{
          borderTop: '1px solid',
          borderColor: 'secondary'
        }}>
          <Styled.h2 >Featured Projects</Styled.h2>
          <ProjectPreviewGrid columns={[1, 2, null]} nodes={projectNodes} browseMoreHref="/archive/" />
        </Container>
      )}

      {postNodes && postNodes.length > 0 && (
        <Container mb={5} px={4, 3} sx={{
          borderTop: '1px solid',
          borderColor: 'secondary'
        }}>
          <Styled.h2 >Latest Posts</Styled.h2>
          <PostPreviewGrid columns={[1, 2, 1]} nodes={postNodes} browseMoreHref="/posts/" />
        </Container>
      )}
    </Layout>
  );
};

export default IndexPage;
