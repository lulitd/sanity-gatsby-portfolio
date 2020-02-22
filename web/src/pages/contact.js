import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { cn } from "../lib/helpers";
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
      <Container className={styles.formContainer}>
        <form id="contact-form" className={styles.contactForm} method="POST" action="https://usebasin.com/f/aeb507374cd0" role="form">
          <h1 className={responsiveTitle1}>Say Hello</h1>
          <p className={styles.greetings}>
            Whether for a potential project or just to say hi, my inbox is always open.</p>
          <div className={styles.controls}>
            <div className={styles.oneLine}>
            <div className={styles.formGroup}>
              <label htmlFor="form_name" className={cn(styles.formLabel, styles.required)}>Name</label>
              <input id="form_name" type="text" name="name" className={styles.formControl} placeholder="Please enter your name *" required="required" data-error="Name is required." />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="form_email" className={cn(styles.formLabel, styles.required)}>Email</label>
              <input id="form_email" type="email" name="email" className={styles.formControl} placeholder="Please enter your email *" required="required" data-error="Valid email is required." />
            </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="form_message" className={cn(styles.formLabel, styles.required)}>Message</label>
              <textarea id="form_message" name="message" className={styles.formControl} placeholder="Message for me *" rows="6" required="required" data-error="Please, leave a message."></textarea>
            </div>
          </div>
          <input type="submit" className={styles.emailBtn} value="Get In Touch" />

<p className={styles.greetings}>I'll try my best to answer your email!</p>
          <p className={cn(styles.fineprint,styles.required)} > These fields are required. </p>
        </form>
      </Container>
    </Layout>
  );
};

export default ContactPage;
