import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Grid, Box, Heading, Text, Flex, Paragraph } from "theme-ui";
import ThemedLink from "./atoms/ThemedLink";
import SanityImage from "./atoms/image";

function ProjectPreview(props) {
  const containerRef = useRef(null);
  const img = props.thumbImage ?? props.mainImage ?? null;

  const cats =
    props.categories &&
    props.categories.length > 0 &&
    props.categories
      .slice(0, 3)
      .map((cat) => cat.title)
      .join(" • ");

  const roles =
    props.roles &&
    props.roles.length > 0 &&
    props.roles
      .flatMap((role) => Object.values(role).filter(Boolean))
      .slice(0, 2)
      .join(" | ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const isMobile = window.matchMedia("(max-width: 639px)").matches;

      const titleEl = containerRef.current.querySelector("[data-animate='title']");

      const originalTitle = props.title || "";

      gsap.set(titleEl, {
        textContent: originalTitle.replace(/[^\s]/g, "#"),
      });

      const words = gsap.utils.toArray(
        containerRef.current.querySelectorAll("[data-animate='word']"),
      );

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
          defaults: {
            duration: 0.7,
            ease: "power2.out",
          },
        });

        words.forEach((word) => {
          const text = word.textContent;

          tl.fromTo(
            word,
            {
              textContent: "#".repeat(text.length),
            },
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
            0, // All words scramble simultaneously
          );
        });
        tl.from(
          "[data-animate='role'], [data-animate='categories']",
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
              x: isMobile ? 0 : 30,
              y: isMobile ? 20 : 0,
              duration: 1,
            },
            isMobile ? 0 : 0.2,
          );
      });

      return () => mm.revert();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Grid
      ref={containerRef}
      columns={[1, 2, 2]}
      gap={[1, 2, 3]}
      sx={{ minHeight: "50vh", minHeight: "50svh", p: 2 }}
    >
      <Flex
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          p: [2, 3, 3],
          mb: 3,
          gap: 3,
        }}
      >
        <Box>
          {/* <Heading
            data-animate="title"
            sx={{
           
            }}
            as="h3"
          >
            {props.title}
          </Heading> */}

          <Heading
            as="h3"
            sx={{ color: "primary500", letterSpacing: "0.125rem", fontSize: [5, 6, 7], mb: 1 }}
          >
            {props.title.split(" ").map((word, i) => (
              <React.Fragment key={i}>
                {i > 0 && " "}
                <span data-animate="word">{word}</span>
              </React.Fragment>
            ))}
          </Heading>
          {roles && (
            <Text
              data-animate="role"
              as="p"
              sx={{
                fontFamily: "nav",
                textTransform: "uppercase",
                color: "secondary",
                textWrapStyle: "pretty",
                "&:before": {
                  content: "'ROLE ❯❯ '",
                },
              }}
            >
              {roles}
            </Text>
          )}
          {cats && (
            <Text
              data-animate="categories"
              sx={{
                fontFamily: "nav",
                textTransform: "uppercase",
                textWrapStyle: "pretty",
                opacity: 0.7,
              }}
            >
              {cats}
            </Text>
          )}
        </Box>
        <Box
          data-animate="description"
          sx={{
            textWrapStyle: "pretty",
            my: 3,
          }}
        >
          {(props.excerpt || props.subtitle) && (
            <Paragraph>{props.excerpt ? props.excerpt : props.subtitle}</Paragraph>
          )}
        </Box>
        <Box
          data-animate="button"
          sx={{
            my: 2,
          }}
        >
          <ThemedLink variant="outlineBtn" to={`/project/${props.slug.current}`}>
            Learn More
          </ThemedLink>
        </Box>
      </Flex>
      <Flex
        data-animate="image"
        sx={{
          flexDirection: "column",
          justifyContent: "space-around",
          gridRowStart: [1, "inherit", "inherit"],
        }}
      >
        <SanityImage
          image={img}
          sx={{
            color: "secondary900",
            filter: "drop-shadow(-5px 10px 10px currentColor)",
            maxWidth: "100%",
          }}
        />
      </Flex>
    </Grid>
  );
}

export default ProjectPreview;
