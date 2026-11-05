export default {
  name: "projectMember",
  title: "Project Collaborator",
  type: "object",

  fields: [
    {
      name: "person",
      title: "Collaborator",
      type: "reference",
      to: [{ type: "person" }],
      description: "Select an existing collaborator or create a new person.",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "roles",
      title: "Role(s) on This Project",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Describe this person's contributions. " + "Example: Motion Designer, Developer, Producer.",
      options: {
        sortable: true,
      },
    },
  ],

  preview: {
    select: {
      name: "person.name",
      roles: "roles",
    },

    prepare({ name, roles = [] }) {
      return {
        title: name || "Select a collaborator",
        subtitle: roles.length ? roles.join(" · ") : "No role specified",
      };
    },
  },
};
