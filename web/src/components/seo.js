import React from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import { imageUrlFor } from "../lib/image-url";
import LogoIcon from "./icon/logo";
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
  console.log(sanityImg);

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
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:secure_url" content={seo.image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      {children}
    </>
  );
};
