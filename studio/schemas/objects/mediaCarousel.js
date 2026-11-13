export default {
  name: "mediaCarousel",
  title: "Media Carousel",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading (optional)",
      type: "string",
      description: "Displayed above the carousel, if provided.",
    },
    {
      name: "ariaLabel",
      title: "Accessible gallery label",
      type: "string",
      description:
        "Used by screen readers when no heading is provided, e.g. “Shadowpox gameplay gallery”.",
    },
    {
      name: "slides",
      title: "Slides",
      type: "array",
      of: [{ type: "figure" }, { type: "video" }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "caption",
      title: "Gallery caption (optional)",
      type: "text",
      rows: 2,
    },
  ],
  preview: {
    select: { title: "heading", label: "ariaLabel", slides: "slides" },
    prepare({ title, label, slides }) {
      const count = slides?.length || 0;
      return {
        title: title || label || "Media Carousel",
        subtitle: `${count} slide${count === 1 ? "" : "s"}`,
      };
    },
  },
};
