import { MdOutlineDocumentScanner } from "react-icons/md";
export default {
  name: "portfolioView",
  type: "document",
  title: "Curated Portfolio",
  icon: MdOutlineDocumentScanner,
  fields: [
    {
      name: "title",
      title: "Internal Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "headline",
      title: "Hero Headline",
      type: "string",
    },
    {
      name: "description",
      title: "Introduction",
      type: "text",
      rows: 3,
    },
    {
      name: "projects",
      title: "Featured Projects",
      description: "Drag to reorder. First project appears first.",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "mediaCarousel",
    },
    {
      name: "closingMessage",
      title: "Closing Message",
      type: "text",
      rows: 3,
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "headline",
    },
  },
};
