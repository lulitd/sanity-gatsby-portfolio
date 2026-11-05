import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import { SEO } from "../components/seo";
import PortableTextRenderer from "../components/sanity/portable-text-renderer";
import { Box, Heading, Grid } from "theme-ui";

import SanityImage from "../components/atoms/image";
import AboutTimeline from "../components/aboutTimeline";

export const query = graphql`
  query AboutQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      author {
        github
        instagram
        twitter
        linkedin
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
        _rawBio
      }
    }
    allSanityMilestone(filter: { featured: { eq: true } }, sort: [{ year: ASC }, { order: ASC }]) {
      nodes {
        _id
        title
        year
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

const AboutPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }

  const site = (data || {}).site;
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

  const profileImage = author.image;
  const milestones = data?.allSanityMilestone?.nodes ?? [];

  return (
    <Container>
      <Grid columns={[1, 1, "2fr 1fr"]} gap={4}>
        <Box mx={["auto", "auto", "0"]}>
          <Heading as="h3">About</Heading>
          {author._rawBio && (
            <PortableTextRenderer
              value={author._rawBio}
              style={{
                maxWidth: ["45ch", "50ch", "fit-content"],
              }}
            />
          )}
        </Box>
        <Box
          as="aside"
          sx={{
            placeItems: "center",
            display: ["none", null, "flex"],
          }}
        >
          {profileImage && profileImage.asset && (
            <SanityImage
              image={profileImage}
              className="gmap-secondary-primary"
              sx={{
                minHeight: 0,
                maxHeight: "100%",
                backgroundColor: "transparent",
                border: "solid currentColor",
                borderWidth: "1",
                borderRadius: "default",
                color: "muted",
                maxWidth: "100%",
              }}
            />
          )}
        </Box>
      </Grid>
      <AboutTimeline milestones={milestones} />
    </Container>
  );
};

export default AboutPage;

export const Head = ({ location }) => <SEO title="About" pathname={location.pathname} />;
