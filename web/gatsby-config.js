// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const clientConfig = require("./client-config");
const token = process.env.SANITY_READ_TOKEN;

const isProd = process.env.NODE_ENV === "production";
const adapter = require("gatsby-adapter-netlify").default;

module.exports = {
  siteMetadata: {
    title: `Lalaine Ulit-Destajo Portfolio`,
    description: `Portfolio website of Lalaine Ulit-Destajo. New Media Artist. Interactive Designer. Creative Coder.`,
    twitterUsername: `@lulitdestajo`,
    image: `src/assets/og-image.jpg`,
    siteUrl: `https://www.lalaineulitdestajo.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `G-XHPV06ELL1`,
        // Puts tracking script in the head instead of the body
        head: false,
        // enable ip anonymization
        anonymize: true,
      },
    },
    "gatsby-plugin-svgr",
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        jsxRuntime: "automatic",
        jsxImportSource: "theme-ui",
        extensions: [".mdx", ".md"],
      },
    },
    "gatsby-plugin-image",
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Source Code Pro`,
            file: `https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap`,
          },
          {
            name: `Inter`,
            file: `https://fonts.googleapis.com/css2?family=Inter&display=swap`,
          },
          {
            name: `Space Mono`,
            file: `https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap`,
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token,
      },
    },
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        ...clientConfig.sanity,
        customImageTypes: ["SanityFigure"],
        defaultImageConfig: {
          quality: 90,
          fit: "max",
          auto: "format",
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Lalaine Portfolio`,
        short_name: `Lalaine Ulit-Destajo Portfolio`,
        start_url: `/`,
        background_color: `#020426`,
        theme_color: `#05a696`,
        display: `standalone`,
        description:
          "Portfolio website of Lalaine Ulit-Destajo. New Media Artist. Interactive Designer. Creative Coder.",
        icon: "src/assets/logo.svg",
      },
    },
  ],
  adapter: adapter({
    excludeDatastoreFromEngineFunction: false,
    imageCDN: false,
  }),
};
