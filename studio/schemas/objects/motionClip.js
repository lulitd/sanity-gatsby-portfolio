export default {
  name: "motionClip",
  title: "Motion Clip",
  type: "object",

  fields: [
    {
      name: "clip",
      title: "MP4 Video",
      type: "file",
      options: {
        accept: "video/mp4",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "poster",
      title: "Poster Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Shown before the clip is loaded or played.",
    },

    {
      name: "aspectRatio",
      title: "Aspect Ratio",
      type: "string",
      description:
        "Choose the display aspect ratio. Auto preserves the video's original proportions.",
      options: {
        list: [
          { title: "Auto (Original)", value: "auto" },
          { title: "16:9 — Landscape", value: "16 / 9" },
          { title: "4:3 — Landscape", value: "4 / 3" },
          { title: "1:1 — Square", value: "1 / 1" },
          { title: "3:4 — Portrait", value: "3 / 4" },
          { title: "9:16 — Portrait", value: "9 / 16" },
        ],
        layout: "dropdown",
      },
      initialValue: "auto",
    },

    {
      name: "playbackMode",
      title: "Playback Mode",
      type: "string",
      options: {
        list: [
          { title: "Autoplay Loop", value: "autoplay" },
          { title: "Hover / Focus", value: "hover" },
          { title: "Click to Play", value: "click" },
        ],
        layout: "radio",
      },
      initialValue: "autoplay",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "loop",
      title: "Loop Playback",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => !parent || parent.playbackMode === "autoplay",
    },
    {
      name: "resetOnLeave",
      title: "Reset After Interaction",
      type: "boolean",
      initialValue: true,
      hidden: ({ parent }) => parent?.playbackMode !== "hover",
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "description",
      title: "Accessibility Description",
      type: "text",
      rows: 2,
      description: "Describe what the animation demonstrates.",
    },
  ],

  preview: {
    select: {
      media: "poster",
      mode: "playbackMode",
      caption: "caption",
    },
    prepare({ media, mode, caption }) {
      return {
        title: caption || "Motion Clip",
        subtitle: mode || "autoplay",
        media,
      };
    },
  },
};
