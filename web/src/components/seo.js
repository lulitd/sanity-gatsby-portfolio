import React from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { imageUrlFor } from "../lib/image-url";

export const SEO = ({ title, description, image, pathname, children }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image: defaultImage,
    siteUrl,
    sanityImg,
    twitterUsername,
    keywords,
  } = useSiteMetadata();

  let imgURL;
  if (sanityImg) imgURL = imageUrlFor(sanityImg);

  const seo = {
    title: [title, defaultTitle].filter(Boolean).join(" — "),
    description: description || defaultDescription,
    image: imgURL || `${siteUrl}/${defaultImage || ``}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
  };

  return (
    <>
      <title>{seo.title}</title>
      <html lang="en" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />
      {children}
    </>
  );
};
