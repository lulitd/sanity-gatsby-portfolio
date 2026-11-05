export default {
  name: "milestone",
  type: "document",
  title: "Career Milestone",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      description: "The year this milestone occurred.",
      validation: (Rule) => Rule.required().integer().min(1900).max(2100),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Education", value: "education" },
          { title: "Career", value: "career" },
          { title: "Project", value: "project" },
          { title: "Achievement", value: "achievement" },
          { title: "Personal", value: "personal" },
          { title: "Other", value: "other" },
        ],
        layout: "dropdown",
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Explain why this moment mattered, not just what happened.",
    },
    {
      name: "image",
      title: "Image (Optional)",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "projects",
      title: "Related Projects",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    },
    {
      name: "link",
      title: "External URL (Optional)",
      type: "url",
    },
    {
      name: "order",
      title: "Order Within Year",
      type: "number",
      description: "For milestones in the same year. Lower numbers appear first.",
      initialValue: 0,
    },
    {
      name: "featured",
      title: "Show on About Page",
      type: "boolean",
      initialValue: true,
    },
  ],

  orderings: [
    {
      title: "Chronological",
      name: "chronological",
      by: [
        { field: "year", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      year: "year",
      category: "category",
      media: "image",
    },
    prepare({ title, year, category, media }) {
      return {
        title: `${year || "—"} / ${title || "Untitled"}`,
        subtitle: category ? category.toUpperCase() : "MILESTONE",
        media,
      };
    },
  },
};
