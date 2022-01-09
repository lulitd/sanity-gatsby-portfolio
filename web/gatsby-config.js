// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const clientConfig = require("./client-config");
const token = process.env.SANITY_READ_TOKEN;

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-transition-link",
      options: {
          layout: require.resolve(`./src/containers/layout.js`)
        }
   },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id:'tal5ocw',
        },
        // google: {
        //   families: ["Space Mono:400,700:latin", "Inter:300,600,800,900:latin"],
        // },
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // Where the animated svgs are.
        },
      },
    },
  ],
};
