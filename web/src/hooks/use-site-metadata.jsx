import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query{
      site {
        siteMetadata {
          description
          image
          siteUrl
          title
          twitterUsername
        }
      }
      allSanitySiteSettings {
        nodes {
          keywords
          title
          socialImage {
            ...ImageWithPreview
          }
          description
        }
      }
    }
  `); 
  const  {siteMetadata}= data.site;
  const  sanity=data.allSanitySiteSettings.nodes[0];
  
  const siteSettings={
    title: sanity.title ?? siteMetadata.title,
    description: sanity.description ?? siteMetadata.title,
    image: siteMetadata.image,
    sanityImg: sanity.socialImage,
    siteUrl:siteMetadata.siteUrl,
    keywords: sanity.keywords,
    twitterUsername:  siteMetadata.twitterUsername,
  };
    
  return siteSettings; 
}