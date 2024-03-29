import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/layout";
import GlobalStyle from "../components/globalStyle";
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

  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          );
        }
        return (
          <>
            <GlobalStyle />
            <Layout
              {...props}
              showNav={showNav}
              authorStatus={{
                statusAvailablity: data.site.statusAvailablity,
                statusMessage: data.site.statusMessage,
                contactEmail: data.site.contactEmail
              }}
              siteTitle={data.site.title}
              onHideNav={handleHideNav}
              onShowNav={handleShowNav}
              author={data.site.author}
            />
          </>
        );
      }}
    />
  );
}

export default LayoutContainer;
