import { format, parseISO } from "date-fns";

export default {
  name: "project",
  title: "Project",
  type: "document",
  fieldsets: [
    {
      name: "social",
      title: "Social media handles",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Some frontend will require a slug to be set to be able to show the project",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "publishedAt",
      title: "Published at",
      description: "You can use this field to schedule projects where you show them",
      type: "datetime",
    },
    {
      name: "featured",
      title: "Featured Project",
      description: "Use this to display project on featured section",
      type: "boolean",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    },
    {
      name: "members",
      title: "Collaborators",
      type: "array",
      of: [{ type: "projectMember" }],
    },
    {
      name: "roles",
      title: "Roles",
      type: "array",
      of: [{ type: "simpleInfo" }],
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "simpleInfo" }],
    },
    {
      name: "startedAt",
      title: "Started at",
      type: "datetime",
    },
    {
      name: "endedAt",
      title: "Ended at",
      type: "datetime",
    },
    {
      name: "thumbImage",
      title: "Thumbnail image",
      type: "figure",
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "figure",
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "projectBrief",
      title: "Project Brief",
      type: "projectPortableText",
    },
    {
      name: "projectBreakdown",
      title: "Breakdown",
      type: "projectPortableText",
    },
    {
      name: "relatedProjects",
      title: "Related projects",
      type: "array",
      of: [{ type: "reference", to: { type: "project" } }],
    },
    {
      name: "accolades",
      title: "Accolades",
      type: "array",
      of: [{ type: "reference", to: { type: "accolade" } }],
    },
    {
      title: "Website",
      name: "website",
      type: "string",
      fieldset: "social",
    },
    {
      title: "Twitter",
      name: "twitter",
      type: "string",
      fieldset: "social",
    },
    {
      title: "Instagram",
      name: "instagram",
      type: "string",
      fieldset: "social",
    },
    {
      title: "Youtube",
      name: "youtube",
      type: "string",
      fieldset: "social",
    },
    {
      title: "Github",
      name: "github",
      type: "string",
      fieldset: "social",
    },
  ],
  // preview: {
  //   select: {
  //     title: 'title',
  //     publishedAt: 'publishedAt',
  //     slug: 'slug',
  //     media: 'mainImage'
  //   },
  //   prepare ({title = 'No title', publishedAt, slug = {}, media}) {
  //     const dateSegment = format(parseISO(publishedAt), 'YYYY/MM')
  //     const path = `/${dateSegment}/${slug.current}/`
  //     return {
  //       title,
  //       media,
  //       subtitle: publishedAt ? path : 'Missing publishing date'
  //     }
  //   }
  // }
};
