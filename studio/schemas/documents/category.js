export default {
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "projectFilter",
      type: "boolean",
      title: "Project Filter",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
  ],
  // ==========================================
  // DOCUMENT LIST PREVIEW
  // ==========================================

  preview: {
    select: {
      title: "title",
      featured: "projectFilter",
    },

    prepare({ title, featured }) {
      return {
        title: [featured ? "Project Filter" : null, title].filter(Boolean).join(": "),
      };
    },
  },
};
