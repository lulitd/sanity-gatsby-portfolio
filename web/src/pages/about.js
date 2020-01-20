import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import BlockContent from "../components/block-content";
import { responsiveTitle1 } from "../components/typography.module.css";
import Icon from "../components/icon";
import styles from "./about.module.css";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

export const query = graphql`
  query AboutQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      author {
        github
        instagram
        twitter
        linkedin
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
        _rawBio
      }
    }
  }
`;

const AboutPage = props => {
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

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

  let socials = [];

  if (author) {
    if (author.twitter) socials.push({ name: "twitter", link: author.twitter });
    if (author.instagram) socials.push({ name: "instagram", link: author.instagram });
    if (author.linkedin) socials.push({ name: "linkedin", link: author.linkedin });
    if (author.github) socials.push({ name: "github", link: author.github });
  }

  const socialIcons = socials.map(social => {
    return (
      <a
        className={styles.socialIcon}
        href={social.link}
        key={social.name}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <Icon symbol={social.name} />
      </a>
    );
  });

  const profileImage= author.image; 
  return (
    <Layout>
      <SEO title="About" />
      <Container>
        <h1 className={responsiveTitle1}>About</h1>

        <div className={styles.grid}>
          <div className={styles.mainContent}>
            {author._rawBio && (
              <div>
                <BlockContent blocks={author._rawBio || []} />
              </div>
            )}
          </div>
          <aside className={styles.profile}>
            {author.image && profileImage.asset && (
              <div className={styles.profileImage}>
                <img
                  src={imageUrlFor(buildImageObj(profileImage))
                    .width(300)
                    .height(300)
                    .fit("crop")
                    .url()}
                  alt={profileImage.alt}
                />
              </div>
            )}
            <div className={styles.socialContainer}>{socialIcons}</div>
          </aside>
        </div>
      </Container>
    </Layout>
  );
};

export default AboutPage;
