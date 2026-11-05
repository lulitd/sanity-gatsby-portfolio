export default {
  name: "creditGroup",
  title: "Credit Group",
  type: "object",

  fields: [
    {
      name: "title",
      title: "Department / Team Name",
      type: "string",
      description:
        "Examples: Production & Direction, " + "Technical Team, Creative Team, Advisors.",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "members",
      title: "Team Members",
      type: "array",
      description: "Add collaborators in their preferred credit order. " + "Drag to reorder them.",
      of: [
        {
          type: "projectMember",
        },
      ],
      options: {
        sortable: true,
        modal: {
          type: "dialog",
          width: 2,
        },
      },

      validation: (Rule) =>
        Rule.custom((members) => {
          if (!members?.length) {
            return "Add at least one collaborator to this group.";
          }

          const ids = members.map((member) => member?.person?._ref).filter(Boolean);

          if (new Set(ids).size !== ids.length) {
            return "A collaborator appears more than once in this group.";
          }

          return true;
        }),
    },
  ],

  preview: {
    select: {
      title: "title",
      members: "members",
    },

    prepare({ title, members = [] }) {
      const count = members.length;

      return {
        title: title || "Untitled Credit Group",
        subtitle: `${count} contributor${count === 1 ? "" : "s"}`,
      };
    },
  },
};
