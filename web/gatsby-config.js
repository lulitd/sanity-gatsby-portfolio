// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`
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
    siteUrl: `https://www.lalaineulitdestajo.com`
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Source Code Pro`,
            file: `https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap`
          },
          {
            name: `Inter`,
            file: `https://fonts.googleapis.com/css2?family=Inter&display=swap`
          }
        ]
      }
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token
      }
    },
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        ...clientConfig.sanity,
        customImageTypes: ["SanityFigure"],
        defaultImageConfig: {
          quality: 90,
          fit: "max",
          auto: "format"
        }
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/ // Where the animated svgs are.
        }
      }
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
        icon: "src/assets/logo.svg"
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-XHPV06ELL1" // Google Analytics / GA
        ],
        // // This object gets passed directly to the gtag config command
        // // This config will be shared across all trackingIds
        // gtagConfig: {
        //   optimize_id: "OPT_CONTAINER_ID",
        //   anonymize_ip: true,
        //   cookie_expires: 0
        // },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true
          // Setting this parameter is also optional
          // respectDNT: true
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
          // // Defaults to https://www.googletagmanager.com
          // origin: "YOUR_SELF_HOSTED_ORIGIN",
          // // Delays processing pageview events on route update (in milliseconds)
          // delayOnRouteUpdate: 0
        }
      }
    }
  ]
};
