// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const clientConfig = require("./client-config");
const token = process.env.SANITY_READ_TOKEN;

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  siteMetadata: {
    title: `Lalaine Ulit-Destajo Portfolio`,
    description: `Portfolio website of Lalaine Ulit-Destajo. New Media Artist. Interactive Designer. Creative Coder.`,
    twitterUsername: `@lulitdestajo`,
    image: `src/assets/logo.svg`,
    siteUrl: `https://www.lalaineulitdestajo.com`,
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-image",
  //   {
  //     resolve: "gatsby-plugin-transition-link",
  //     options: {
  //         layout: require.resolve(`./src/containers/layout.js`)
  //       }
  //  },
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
      resolve: "gatsby-plugin-sanity-image",
      options: {
        ...clientConfig.sanity,
        customImageTypes: ["figure", "images", "SanityFigure","SanityDefaultImage"],
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
    {
      resolve:"gatsby-plugin-manifest",
      options: {
        name: `Lalaine Portfolio`,
        short_name: `Lalaine Ulit-Destajo Portfolio`,
        start_url: `/`,
        background_color: `#020426`,
        theme_color: `#05a696`,
        display: `standalone`,
        description:"Portfolio website of Lalaine Ulit-Destajo. New Media Artist. Interactive Designer. Creative Coder.",
        icon:"src/assets/logo.svg",
    }
  }
  ],
};
