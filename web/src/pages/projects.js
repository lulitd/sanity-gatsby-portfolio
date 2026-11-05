import React from "react";
import { graphql } from "gatsby";
import { useLocation } from "@reach/router";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project/project-preview-grid";
import { SEO } from "../components/seo";
import CategoryLinkList from "../components/category-link-list";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { Heading, Box } from "theme-ui";
import MobileCategoryMenu from "../components/mobile-category-menu";
import { alpha } from "@theme-ui/color";
export const query = graphql`
  query ArchivePageQuery($currentDate: Date) {
    archive: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      archive {
        _id
        title
      }
    }
    projects: allSanityProject(
      sort: { publishedAt: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null, lte: $currentDate } }
    ) {
      totalCount
      edges {
        node {
          publishedAt
          _id
          mainImage {
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
          thumbImage {
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
          title
          subtitle
          excerpt
          roles {
            fieldTitle
            fieldInfo
          }
          categories {
            title
          }
          slug {
            current
          }
        }
      }
    }
    usedCategories: allSanityProject(
      sort: { publishedAt: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null, lt: $currentDate } }
    ) {
      group(field: { categories: { title: SELECT } }) {
        totalCount
        fieldValue
      }
    }
    categories: allSanityCategory(filter: { projectFilter: { eq: true } }, sort: { title: ASC }) {
      edges {
        node {
          title
          id
          slug {
            current
          }
        }
      }
    }
  }
`;

const ArchivePage = ({ data, errors }) => {
  const location = useLocation();

  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }

  const projectNodes = mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs);

  const categoryNodes = mapEdgesToNodes(data.categories);
  const usedCategories = data.usedCategories;
  const archiveOrder = data.archive?.archive;

  // Read selected category from URL
  const params = new URLSearchParams(location.search);
  const categorySlug = params.get("category");

  // Find matching category
  const currentCategory = categoryNodes.find((cat) => cat.slug.current === categorySlug) || {
    title: "All",
  };

  // Filter projects without remounting the page
  const visibleProjects =
    currentCategory.title === "All"
      ? projectNodes
      : projectNodes.filter((project) =>
          project.categories?.some((cat) => cat.title === currentCategory.title),
        );

  return (
    <Container sx={{ textAlign: "center" }}>
      <Heading as="h1">
        Projects
        {currentCategory.title !== "All" && ` // ${currentCategory.title}`}
      </Heading>

      {/* Desktop: Sticky category navigation */}
      <Box
        sx={{
          display: ["none", "block"],
          position: "sticky",
          top: ["4rem", "5rem"],
          zIndex: 100,
          p: 3,
          mb: 4,

          bg: "background",
          border: "2px solid",
          borderColor: "primary",
          borderRadius: "1rem",
          borderColor: alpha("primary", 0.4),
          boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
        }}
      >
        <CategoryLinkList
          categories={categoryNodes}
          currentCategory={currentCategory}
          all={true}
          used={usedCategories}
        />
      </Box>

      {/* Mobile: Floating category selector */}
      <MobileCategoryMenu
        categories={categoryNodes}
        currentCategory={currentCategory}
        used={usedCategories}
      />

      <ProjectPreviewGrid nodes={visibleProjects} order={archiveOrder} />
    </Container>
  );
};

export default ArchivePage;

export const Head = ({ location }) => {
  const params = new URLSearchParams(location?.search || "");

  return <SEO title={params.get("category") ? "Project Category" : "All Projects"} />;
};
