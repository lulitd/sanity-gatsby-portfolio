export default {
  name: "project",
  title: "Project",
  type: "document",

  // Studio editing tabs
  groups: [
    {
      name: "overview",
      title: "Overview",
      default: true,
    },
    {
      name: "content",
      title: "Case Study",
    },
    {
      name: "media",
      title: "Media & Layout",
    },
    {
      name: "credits",
      title: "Credits & Details",
    },
    {
      name: "settings",
      title: "Publishing & Links",
    },
  ],

  // Collapsible fields within tabs
  fieldsets: [
    {
      name: "social",
      title: "External Links & Social Media",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: "legacyCredits",
      title: "Legacy Collaborators",
      description:
        "Original collaborator list. Used as a fallback when " +
        "grouped credits are not provided.",
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],

  fields: [
    // ==========================================
    // 01. OVERVIEW
    // ==========================================

    {
      name: "title",
      title: "Project Title",
      type: "string",
      group: "overview",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "overview",
      description: "Used to generate the project's URL. " + "Avoid changing after publishing.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: "subtitle",
      title: "Project Tagline",
      type: "string",
      group: "overview",
      description:
        "A short identifying tagline for the project. " +
        "Also used as a fallback when the card excerpt is empty.",
    },

    {
      name: "excerpt",
      title: "Project Card Description",
      type: "text",
      group: "overview",
      rows: 3,
      description:
        "A concise description used on the homepage, " +
        "Projects page, and Related Projects cards. " +
        "Aim for approximately 25–40 words.",
      validation: (Rule) => Rule.max(300),
    },

    {
      name: "categories",
      title: "Project Categories",
      type: "array",
      group: "overview",
      description:
        "Choose categories that describe the type of work. " +
        "These may appear on project cards and filters.",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    },

    {
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      group: "overview",
      description: "Display this project in the homepage's highlighted work.",
      initialValue: false,
    },

    // ==========================================
    // 02. CASE STUDY
    // ==========================================

    {
      name: "projectBrief",
      title: "Project Brief",
      type: "projectPortableText",
      group: "content",
      description:
        "Introduce the project, its purpose, audience, " + "context, and creative challenge.",
    },

    {
      name: "projectBreakdown",
      title: "Project Breakdown",
      type: "projectPortableText",
      group: "content",
      description:
        "Explain your process, contributions, creative " +
        "decisions, technical challenges, and outcomes.",
    },

    // ==========================================
    // 03. MEDIA & LAYOUT
    // ==========================================

    {
      name: "mainImage",
      title: "Main Project Image",
      type: "figure",
      group: "media",
      description:
        "Primary image for the project page. " + "Also used as a fallback for project cards.",
    },

    {
      name: "thumbImage",
      title: "Project Thumbnail",
      type: "figure",
      group: "media",
      description:
        "Image used for project previews. " + "Choose a composition that works at smaller sizes.",
    },

    {
      name: "heroLayout",
      title: "Hero Layout",
      type: "string",
      group: "media",
      description: "Choose how the project header is displayed.",
      options: {
        list: [
          {
            title: "Full Bleed (Parallax)",
            value: "full",
          },
          {
            title: "Split (Editorial + Image)",
            value: "split",
          },
          {
            title: "Editorial (Text Only)",
            value: "editorial",
          },
        ],
        layout: "radio",
      },
      initialValue: "full",
    },

    {
      name: "heroImagePosition",
      title: "Hero Image Position",
      type: "string",
      group: "media",
      description: "Choose which side the image appears on " + "when using the split hero layout.",
      options: {
        list: [
          { title: "Right", value: "right" },
          { title: "Left", value: "left" },
        ],
        layout: "radio",
      },
      initialValue: "right",
      hidden: ({ document }) => document?.heroLayout !== "split",
    },

    // ==========================================
    // 04. CREDITS & DETAILS
    // ==========================================

    {
      name: "roles",
      title: "My Roles & Contributions",
      type: "array",
      group: "credits",
      description:
        "Your responsibilities on this project. " +
        "The first roles may also appear on project cards.",
      of: [{ type: "simpleInfo" }],
    },

    {
      name: "technologies",
      title: "Tools & Technologies",
      type: "array",
      group: "credits",
      description: "Technologies, software, frameworks, " + "and techniques used in this project.",
      of: [{ type: "simpleInfo" }],
    },

    {
      name: "creditGroups",
      title: "Grouped Project Credits",
      type: "array",
      group: "credits",

      description:
        "Organize collaborators by department or team. " +
        "Drag groups to change their display order.",

      of: [
        {
          type: "creditGroup",
        },
      ],

      options: {
        sortable: true,
        modal: {
          type: "dialog",
          width: 3,
        },
      },
    },

    {
      name: "members",
      title: "Original Collaborator List",
      type: "array",
      group: "credits",
      fieldset: "legacyCredits",
      description:
        "Existing credits retained for older projects. " +
        "Used when no grouped credits are provided.",
      of: [{ type: "projectMember" }],
    },

    // ==========================================
    // 05. PUBLISHING & LINKS
    // ==========================================

    {
      name: "publishedAt",
      title: "Publication Date",
      type: "datetime",
      group: "settings",
      description:
        "Controls the publication date used by your " + "frontend queries and scheduling logic.",
    },

    {
      name: "startedAt",
      title: "Project Start Date",
      type: "datetime",
      group: "settings",
    },

    {
      name: "endedAt",
      title: "Project End Date",
      type: "datetime",
      group: "settings",
    },

    {
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      group: "settings",
      description: "Select projects to recommend at the end " + "of this case study.",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    },

    {
      name: "accolades",
      title: "Awards & Recognition",
      type: "array",
      group: "settings",
      description:
        "Connect awards, exhibitions, or other " + "recognition associated with this project.",
      of: [
        {
          type: "reference",
          to: [{ type: "accolade" }],
        },
      ],
    },

    {
      name: "website",
      title: "Project Website",
      type: "string",
      group: "settings",
      fieldset: "social",
    },

    {
      name: "youtube",
      title: "YouTube",
      type: "string",
      group: "settings",
      fieldset: "social",
    },

    {
      name: "instagram",
      title: "Instagram",
      type: "string",
      group: "settings",
      fieldset: "social",
    },

    {
      name: "github",
      title: "GitHub",
      type: "string",
      group: "settings",
      fieldset: "social",
    },

    {
      name: "twitter",
      title: "Twitter / X",
      type: "string",
      group: "settings",
      fieldset: "social",
    },
  ],

  // ==========================================
  // DOCUMENT LIST PREVIEW
  // ==========================================

  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      featured: "featured",
      media: "thumbImage",
      fallbackMedia: "mainImage",
    },

    prepare({ title, subtitle, featured, media, fallbackMedia }) {
      return {
        title: title || "Untitled Project",
        subtitle: [featured ? "★ Featured" : null, subtitle].filter(Boolean).join(" · "),
        media: media || fallbackMedia,
      };
    },
  },
};
