import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Grid, Box, Heading, Text, Flex, Paragraph } from "theme-ui";
import ThemedLink from "../atoms/ThemedLink";
import SanityImage from "../atoms/image";

function ProjectPreview({
  title,
  slug,
  subtitle,
  excerpt,
  thumbImage,
  mainImage,
  categories = [],
  roles = [],
  cardRole,
  variant = "featured",
}) {
  const containerRef = useRef(null);

  const img = thumbImage ?? mainImage ?? null;

  const isFeatured = variant === "featured";
  const isRelated = variant === "related";

  const showDescription = isFeatured || isRelated;

  // Project categories
  const categoryText = categories
    .filter(Boolean)
    .slice(0, 2)
    .map((cat) => cat.title)
    .filter(Boolean)
    .join(" · ");

  // Prefer a curated card role when available
  const roleText =
    cardRole ||
    roles
      .map((role) => role.fieldTitle)
      .filter(Boolean)
      .slice(0, 2)
      .join(" · ");

  const description = excerpt || subtitle;

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

    const element = containerRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const isMobile = window.matchMedia("(max-width: 639px)").matches;

        const words = gsap.utils.toArray(element.querySelectorAll("[data-animate='word']"));

        const tl = gsap.timeline({
          paused: true,
          defaults: {
            duration: 0.7,
            ease: "power2.out",
          },
        });

        words.forEach((word) => {
          const text = word.textContent;

          tl.fromTo(
            word,
            { textContent: "#".repeat(text.length) },
            {
              duration: 1.2,
              scrambleText: {
                text,
                chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&",
                speed: 0.5,
                revealDelay: 0.15,
                tweenLength: false,
              },
              ease: "none",
            },
            0,
          );
        });

        tl.from(
          "[data-animate='categories']",
          {
            autoAlpha: 0,
            y: 10,
            stagger: 0.1,
          },
          0,
        );
        tl.from(
          "[data-animate='roles']",
          {
            autoAlpha: 0,
            y: 10,
            stagger: 0.1,
          },
          "-=0.2",
        )
          .from(
            "[data-animate='description']",
            {
              autoAlpha: 0,
              y: 15,
            },
            "-=0.4",
          )
          .from(
            "[data-animate='button']",
            {
              autoAlpha: 0,
              y: 10,
            },
            "-=0.4",
          )
          .from(
            "[data-animate='image']",
            {
              autoAlpha: 0,
              x: isMobile ? 0 : 10,
              y: isMobile ? 20 : 0,
              duration: 1,
            },
            isMobile ? 0 : 0.2,
          );

        const trigger = ScrollTrigger.create({
          trigger: element,
          start: "top 80%",
          once: true,
          onEnter: () => tl.play(),
        });

        return () => {
          trigger.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <Grid
      ref={containerRef}
      columns={[1, 2, "5fr 4fr"]}
      gap={[2, 3, 4]}
      sx={{
        minHeight: isFeatured ? ["auto", "40svh", "45svh"] : "auto",
        py: isFeatured ? [4, 5] : [3, 4],
        px: [2, 3],
        alignItems: "center",
      }}
    >
      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          p: [2, 3],
          gap: 3,
        }}
      >
        <Box>
          {categoryText && (
            <Text
              as="p"
              data-animate="categories"
              sx={{
                fontFamily: "nav",
                textTransform: "uppercase",
                color: "muted",
                mb: 2,
                fontSize: 1,
                letterSpacing: "0.05em",
              }}
            >
              {categoryText}
            </Text>
          )}

          <Heading
            as="h3"
            sx={{
              color: "primary500",
              letterSpacing: "0.125rem",
              fontSize: isRelated ? [4, 5] : [5, 6, 7],
              mb: 2,
            }}
          >
            {(title || "").split(" ").map((word, i) => (
              <React.Fragment key={i}>
                {i > 0 && " "}
                <span data-animate="word">{word}</span>
              </React.Fragment>
            ))}
          </Heading>

          {roleText && (
            <Text
              as="p"
              data-animate="roles"
              sx={{
                fontFamily: "nav",
                textTransform: "uppercase",
                color: "secondary",
                fontSize: 1,
              }}
            >
              {roleText}
            </Text>
          )}
        </Box>

        {showDescription && description && (
          <Box data-animate="description">
            <Paragraph
              sx={{
                textWrapStyle: "pretty",
                maxWidth: "50ch",
              }}
            >
              {description}
            </Paragraph>
          </Box>
        )}

        <Box data-animate="button" py={4}>
          <ThemedLink variant="outlineBtn" to={`/project/${slug?.current}`}>
            Explore Project
          </ThemedLink>
        </Box>
      </Flex>

      {img && (
        <Flex
          data-animate="image"
          sx={{
            width: "100%",
            minWidth: 0,
            alignItems: "center",
            justifyContent: "center",
            gridRowStart: [1, "auto"],
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: isRelated ? "65%" : "100%",
              mx: "auto",
            }}
          >
            <SanityImage
              image={img}
              sx={{
                width: "100%",
                color: "secondary900",
                filter: "drop-shadow(-5px 10px 10px currentColor)",
              }}
            />
          </Box>
        </Flex>
      )}
    </Grid>
  );
}

export default ProjectPreview;
