import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/layout";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
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
  const html = document.querySelector("html");

  // useEffect(() => {
  //   showNav ? (html.style.overflow = "hidden") : (html.style.overflow = "auto");
  // }, [showNav]);

  return (
    <StaticQuery
      query={query}
      render={(data) => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          );
        }
        return (
          <Layout
            {...props}
            showNav={showNav}
            siteTitle={data.site.title}
            onHideNav={handleHideNav}
            onShowNav={handleShowNav}
            author={data.site.author}
          />
        );
      }}
    />
  );
}

export default LayoutContainer;
