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
   resolve: `gatsby-omni-font-loader`,
   options: {
     enableListener: true,
     preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
     web: [
       {
        name: `Libre Barcode 39 Text`,
        file: `https://fonts.googleapis.com/css2?family=Libre+Barcode+39+Text&display=swap`,
      },
      {
        name: `Source Code Pro`,
        file: `https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap`,
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // Where the animated svgs are.
        },
      },
    },
  ],
};
