export default {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  // __experimental_actions: [
  //   // 'create',
  //   'update',
  //   // 'delete',
  //   'publish'
  // ],
  fieldsets: [
    {
      name: "jumbotron",
      title: "Jumbotron Settings",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "contact",
      title: "Contact Settings",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "logo",
      type: "image",
      title: "Logo",
    },
    {
      name: "author",
      type: "reference",
      description: "Publish an author and set a reference to them here.",
      title: "Author",
      to: [{ type: "person" }],
    },
    {
      name: "description",
      type: "string",
      title: "Description",
      description: "Describe your portfolio for search engines and social media.",
    },
    {
      name: "jumboDescription",
      type: "string",
      title: "Jumbotron Description",
      description: "This is the description that appears in the header of the index page.",
      fieldset: "jumbotron",
    },
    {
      name: "jumboName",
      type: "string",
      title: "Jumbotron Name",
      description: "This is the name that appears in the jumbotron of index page.",
      fieldset: "jumbotron",
    },
    {
      name: "jumboTag",
      type: "string",
      title: "Jumbotron Tag",
      description: "This is the tag that appears in the jumbotron of index page.",
      fieldset: "jumbotron",
    },
    {
      name: "contactEmail",
      type: "string",
      title: "email",
      description: "This is the email that people can contact you at",
      rows: "1",
      validation: (Rule) => Rule.email(),
      fieldset: "contact",
    },
    {
      name: "statusMessage",
      type: "string",
      title: "Current Status Message",
      description: "This is the text that appears in the status",
      rows: "1",
      initalValue: "Available",
      validation: (Rule) => Rule.min(4).max(25),
      fieldset: "contact",
    },
    {
      title: "Availibility",
      name: "statusAvailablity",
      type: "string",
      fieldset: "contact",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Unavailable", value: "unavailable" },
          { title: "Lets Chat", value: "chat" },
        ], // <-- predefined values
      },
    },
    {
      name: "contactor",
      type: "reference",
      title: "contactor",
      to: [{ type: "person" }],
      description: "This is will display the social icons of the contactor",
      fieldset: "contact",
    },
    {
      name: "keywords",
      type: "array",
      title: "Keywords",
      description: "Add keywords that describes your portfolio.",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "archive",
      type: "array",
      description: "Defines order of projects",
      title: "Archive",
      of: [{ type: "reference", to: { type: "project" } }],
    },
    {
      name: "featuredLogos",
      type: "array",
      description: "This sets the logos that appear in the homepage",
      of: [{ type: "image" }],
    },
  ],
};
