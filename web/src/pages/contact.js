import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

import { responsiveTitle1 } from "../components/typography.module.css";
import Icon from "../components/icon";
import styles from "./contact.module.css";

export const query = graphql`
  query ContactQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      contactEmail
    }
  }
`;

const ContactPage = props => {
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
  return (
    <Layout>
      <SEO title="About" />
      <Container>
        <h1 className={responsiveTitle1}>Say Hello</h1>

        <p>
          Whether for a potential project or just to say hi, my inbox is always open. I'll try my
          best to answer your email!
        </p>
        <a
          href={`mailto:${site.contactEmail}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className={styles.emailBtn}
        >
          Get In Touch
        </a>
        </Container>
    </Layout>
  );
};

export default ContactPage;
