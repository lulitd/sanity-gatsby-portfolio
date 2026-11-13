import { BsTrophyFill } from "react-icons/bs";
export default {
  name: "accolade",
  type: "document",
  title: "Accolade",
  icon: BsTrophyFill,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "date",
      type: "date",
      options: {
        dateFormat: "YYYY",
      },
      title: "Date",
    },
    {
      name: "event",
      title: "Event",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "linkTo",
      title: "URL",
      type: "url",
    },
    {
      name: "projects",
      title: "Projects",
      type: "array",
      of: [{ type: "reference", to: { type: "project" } }],
    },
  ],
  orderings: [
    {
      title: "Year",
      name: "date",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      event: "event",
      address: "address",
    },
    prepare({ title, date, event, address }) {
      const year = date?.split("-")[0] || "—";

      return {
        title: `${year}: ${title || "Untitled"}`,
        subtitle: [event, address].filter(Boolean).join(" · "),
      };
    },
  },
};
