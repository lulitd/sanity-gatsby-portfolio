import React from "react";
// import Layout from "../containers/layout";
import {SEO} from "../components/seo";
import { graphql } from "gatsby";
import Container from "../components/container";
import CategoryLinkList from "../components/category-link-list";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import ProjectPreviewGrid from "../components/project-preview-grid";
import { Styled ,Heading} from "theme-ui";
export const query = graphql`
query CategoryTemplateQuery($id: String!) {
  category: sanityCategory(id: {eq: $id}) {
    id
    title
  }
  allProjects: allSanityProject(
    sort: {publishedAt: DESC}
    filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
  ) {
    totalCount
  }
  projects: allSanityProject(
    filter: {categories: {elemMatch: {id: {eq: $id}}}, publishedAt: {ne: null}}
  ) {
    edges {
      node {
        id
        mainImage {
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
  usedCategories: allSanityProject(
    sort: {publishedAt: DESC}
    filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
  ) {
    group(field: {categories: {title: SELECT}}) {
      totalCount
      fieldValue
    }
  }
  categories: allSanityCategory(
    filter: {projectFilter: {eq: true}}
    sort: {title: ASC}
  ) {
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

const CategoryTemplate = (props) => {
  const { data, errors } = props;
  const category = data && data.category;

  const categoryNodes = data && data.categories && mapEdgesToNodes(data.categories);

  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs);

  const usedCategories = data && data.usedCategories;
  const totalCount = data && data.allProjects && data.allProjects.totalCount;

  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {category && <SEO title={category.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

  
      <Container sx={{
        textAlign:"center" 
      }}>
      <Heading as="h1" variant={'text.barcodes'} fontSize={[8]}>{`Projects // ${category.title}`} </Heading>
        <CategoryLinkList
          categories={categoryNodes}
          currentCategory={category}
          all={true}
          used={usedCategories}
          total={totalCount}
        />
        
        {projectNodes && projectNodes.length > 0 && <ProjectPreviewGrid nodes={projectNodes} />}
      </Container>
    </>
  );
};

export default CategoryTemplate;

export const Head = () => (
  <SEO title="Category" />
)
