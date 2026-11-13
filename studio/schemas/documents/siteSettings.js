export default {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  // ----------------------------------------
  // FIELD GROUPS
  // ----------------------------------------
  groups: [
    {
      name: "general",
      title: "General",
      default: true,
    },
    {
      name: "homepage",
      title: "Homepage",
    },
    {
      name: "projects",
      title: "Projects",
    },
    {
      name: "contact",
      title: "Contact",
    },
    {
      name: "seo",
      title: "SEO & Social",
    },
  ],

  fields: [
    // ----------------------------------------
    // GENERAL
    // ----------------------------------------
    {
      name: "title",
      type: "string",
      title: "Site Title",
      group: "general",
    },
    {
      name: "logo",
      type: "image",
      title: "Site Logo",
      group: "general",
    },
    {
      name: "author",
      type: "reference",
      title: "Site Author",
      description: "Reference to your primary author profile.",
      to: [{ type: "person" }],
      group: "general",
    },

    // ----------------------------------------
    // HOMEPAGE
    // ----------------------------------------
    {
      name: "jumboName",
      type: "string",
      title: "Hero Name",
      description: "Name displayed in the homepage hero.",
      group: "homepage",
    },
    {
      name: "jumboTag",
      type: "string",
      title: "Hero Tagline",
      description: "Short tagline displayed in the homepage hero.",
      group: "homepage",
    },
    {
      name: "jumboDescription",
      type: "string",
      title: "Hero Description",
      description: "Description displayed in the homepage hero.",
      group: "homepage",
    },
    {
      name: "jumboImage",
      type: "image",
      title: "Hero Image",
      description: "Main visual displayed in the homepage hero.",
      group: "homepage",
      options: {
        hotspot: true,
      },
    },
    {
      name: "featuredLogos",
      type: "array",
      title: "Featured Logos",
      description: "Logos displayed on the homepage.",
      group: "homepage",
      of: [
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              description: "Describe the logo for accessibility.",
            },
          ],
        },
      ],
    },

    // ----------------------------------------
    // PROJECTS
    // ----------------------------------------
    {
      name: "archive",
      type: "array",
      title: "Project Archive Order",
      description: "Drag and drop projects to control their order.",
      group: "projects",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    },

    // ----------------------------------------
    // CONTACT & AVAILABILITY
    // ----------------------------------------
    {
      name: "contactEmail",
      type: "string",
      title: "Contact Email",
      description: "Public email address for inquiries.",
      group: "contact",
      validation: (Rule) => Rule.email(),
    },
    {
      // Original field name retained for data compatibility.
      name: "statusAvailablity",
      type: "string",
      title: "Availability",
      description: "Your current availability status.",
      group: "contact",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Unavailable", value: "unavailable" },
          { title: "Let's Chat", value: "chat" },
        ],
        layout: "radio",
      },
      initialValue: "available",
    },
    {
      name: "statusMessage",
      type: "string",
      title: "Status Message",
      description: "Short message displayed alongside your status.",
      group: "contact",
      initialValue: "Available",
      validation: (Rule) => Rule.min(4).max(25),
    },
    {
      name: "contactor",
      type: "reference",
      title: "Contact Profile",
      description: "Person profile containing your social links.",
      to: [{ type: "person" }],
      group: "contact",
    },

    // ----------------------------------------
    // SEO & SOCIAL
    // ----------------------------------------
    {
      name: "description",
      type: "string",
      title: "Meta Description",
      description: "Default description for search engines and social media.",
      group: "seo",
    },
    {
      name: "keywords",
      type: "array",
      title: "SEO Keywords",
      description: "Keywords describing your portfolio.",
      group: "seo",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "socialImage",
      type: "image",
      title: "Default Social Share Image",
      description: "Fallback image displayed when your site is shared.",
      group: "seo",
    },
  ],
};
