export default {
  name: "mediaCarousel",
  title: "Media Carousel",
  type: "object",
  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "appearence",
      title: "appearence and function",
      default: false,
    },
  ],
  fields: [
    {
      name: "heading",
      title: "Heading (optional)",
      type: "string",
      description: "Displayed above the carousel, if provided.",
      group: "content",
    },
    {
      name: "ariaLabel",
      title: "Accessible gallery label",
      type: "string",
      group: "content",
      description:
        "Used by screen readers when no heading is provided, e.g. “Shadowpox gameplay gallery”.",
    },
    {
      name: "slides",
      title: "Slides",
      type: "array",
      group: "content",
      of: [{ type: "figure" }, { type: "video" }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "caption",
      title: "Gallery caption (optional)",
      type: "text",
      group: "content",
      rows: 2,
    },
    {
      group: "appearence",
      name: "carouselLayout",
      title: "Carousel Layout",
      type: "string",
      description: "Choose how the carousel is displayed.",
      options: {
        list: [
          {
            title: "Default",
            value: "default",
          },
          {
            title: "Thumbnails",
            value: "thumbnails",
          },
        ],
        layout: "radio",
      },
      initialValue: "default",
    },
    {
      group: "appearence",
      name: "autoCycle",
      title: "Autocycle",
      type: "boolean",
      description: "Choose if the carousel will auto cycle between slides",
      initialValue: false,
    },
    {
      group: "appearence",
      name: "autoCycleInterval",
      title: "Autocycle Interval",
      type: "number",
      description: "The time between cycling slides in ms",
      initialValue: 5000,
      hidden: ({ parent }) => !parent?.autoCycle,
      validation: (Rule) => Rule.min(1000).integer(),
    },
    {
      group: "appearence",
      name: "transitionLength",
      title: "Transition length",
      type: "number",
      description: "how long transitions between slides in ms",
      initialValue: 1000,
      validation: (Rule) => Rule.min(1000).integer(),
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
