import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/layout";
import GlobalStyle from "../components/globalStyle";
import { useSiteMetadata } from "../hooks/use-site-metadata";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      statusAvailablity
      statusMessage
      contactEmail
      author {
        github
        instagram
        twitter
        linkedin
        name
      }
    }
  }
`;

function LayoutContainer(props) {
  const [showNav, setShowNav] = useState(false);

  function handleShowNav() {
    setShowNav(true);
  }
  function handleHideNav() {
    setShowNav(false);
  }

  const { title, statusAvailablity, statusMessage, contactEmail, author } = useSiteMetadata();

  return (
    <>
      <GlobalStyle />
      <Layout
        {...props}
        showNav={showNav}
        authorStatus={{
          statusAvailablity: statusAvailablity,
          statusMessage: statusMessage,
          contactEmail: contactEmail,
        }}
        siteTitle={title}
        onHideNav={handleHideNav}
        onShowNav={handleShowNav}
        author={author}
      />
    </>
  );
}

export default LayoutContainer;
