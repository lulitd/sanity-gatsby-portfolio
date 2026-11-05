import React from "react";

import ParallaxHero from "./parallaxHero";
import SplitHero from "./splitHero";
import EditorialHero from "./editorialHero";
import HeroContent from "./heroContent";

const ProjectHero = ({
  title,
  subtitle,
  mainImage,
  categories = [],
  socialIcons,
  heroLayout = "full",
  heroImagePosition = "right",
}) => {
  const hasImage = Boolean(mainImage?.asset);

  // Preserve the existing image hero for older projects.
  // Fall back to editorial when there is no image.
  const layout = !hasImage
    ? "editorial"
    : ["full", "split", "editorial"].includes(heroLayout)
      ? heroLayout
      : "full";

  const imagePosition = heroImagePosition === "left" ? "left" : "right";

  switch (layout) {
    case "split":
      return (
        <SplitHero mainImage={mainImage} imagePosition={imagePosition}>
          <HeroContent
            title={title}
            subtitle={subtitle}
            socialIcons={socialIcons}
            compact
            maxWidth="650px"
          />
        </SplitHero>
      );

    case "editorial":
      return (
        <EditorialHero
          title={title}
          subtitle={subtitle}
          socialIcons={socialIcons}
          categories={categories}
        />
      );

    case "full":
    default:
      return (
        <ParallaxHero mainImage={mainImage}>
          <HeroContent
            title={title}
            subtitle={subtitle}
            socialIcons={socialIcons}
            light
            maxWidth="1000px"
          />
        </ParallaxHero>
      );
  }
};

export default ProjectHero;
