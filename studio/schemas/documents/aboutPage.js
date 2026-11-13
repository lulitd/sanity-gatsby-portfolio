export default {
  name: "aboutPage",
  type: "document",
  title: "About Page",
  groups: [
    {
      name: "intro",
      title: "01.Introduction",
      default: true,
    },
    {
      name: "journey",
      title: "02.Journey & Accolades",
    },
    {
      name: "personal",
      title: "03.Beyond the Work",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    // ----------------------------------------
    // INTRODUCTION
    // ----------------------------------------
    {
      name: "heroHeading",
      title: "Main Heading",
      type: "string",
      description: "Primary heading for the About page.",
      group: "intro",
    },
    {
      name: "heroLabel",
      title: "Section Label",
      type: "string",
      description: "Small label displayed above the main heading.",
      group: "intro",
    },
    {
      name: "heroIntro",
      title: "Introduction",
      type: "text",
      rows: 4,
      description: "A brief introduction to who you are and what you do.",
      group: "intro",
    },
    {
      name: "heroPortrait",
      title: "Portrait",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
      group: "intro",
    },

    // ----------------------------------------
    // JOURNEY & ACCOLADES
    // ----------------------------------------
    {
      name: "timelineHeading",
      title: "Timeline Heading",
      type: "string",
      initialValue: "The Journey",
      group: "journey",
    },
    {
      name: "timelineLabel",
      title: "Timeline Section Label",
      description: "Small label displayed below the timeline heading.",
      type: "string",
      group: "journey",
    },
    {
      name: "timelineIntro",
      title: "Timeline Introduction",
      type: "text",
      rows: 3,
      description: "Optional introduction above the career timeline.",
      group: "journey",
    },
    {
      name: "accoladesHeading",
      title: "Accolades Heading",
      type: "string",
      initialValue: "Accolades",
      group: "journey",
    },
    {
      name: "accolades",
      title: "Selected Accolades",
      type: "array",
      description: "Select and order accolades for the About page.",
      of: [
        {
          type: "reference",
          to: [{ type: "accolade" }],
        },
      ],
      group: "journey",
    },
    // ----------------------------------------
    // BEYOND THE WORK
    // ----------------------------------------
    {
      name: "personalHeading",
      title: "Personal Section Heading",
      type: "string",
      group: "personal",
    },
    {
      name: "personalLabel",
      title: "Pesonal Section label",
      description: "Small label displayed below the main heading.",
      type: "string",
      group: "personal",
    },
    {
      name: "personalDescription",
      title: "Personal Description",
      type: "projectPortableText",
      description: "Interests, hobbies, and life outside of work.",
      group: "personal",
    },
    {
      name: "personalGallery",
      title: "Personal Photo Gallery",
      type: "mediaCarousel",
      description: "Photos that show your interests beyond work.",
      group: "personal",
    },

    // ----------------------------------------
    // SEO
    // ----------------------------------------
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Title used in search results and browser tabs.",
      group: "seo",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Description for search engines and social sharing.",
      validation: (Rule) => Rule.max(160),
      group: "seo",
    },
    {
      name: "seoImage",
      title: "Social Share Image",
      type: "image",
      description: "Optional About-specific sharing image.",
      options: {
        hotspot: true,
      },
      group: "seo",
    },
  ],

  preview: {
    prepare() {
      return {
        title: "About Page",
        subtitle: "Portfolio About Page Content",
      };
    },
  },
};
