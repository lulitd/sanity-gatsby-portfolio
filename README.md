# sanity-gatsby-portfolio

A portfolio using structured content and a static site builder.

Deployed from [sanity.io/create](https://www.sanity.io/create/?template=sanity-io%2Fsanity-template-gatsby-portfolio).

## What you have

- A blazing fast portfolio with [Gatsby.js](https://gatsbyjs.org)
- Structured content using [Sanity.io](https://www.sanity.io)
- Global deployment on [Netlify](https://netlify.com)

## Quick start

1. Clone this repository from your GitHub account
2. `npm install` in the project root folder on local
3. `npm run dev` to start the Studio and frontend locally
   - Your Studio should be running on [http://localhost:3333](http://localhost:3333)
   - Your frontend should be running on [http://localhost:8000](http://localhost:8000)
4. `npm run build` to build to production locally

## Enable real-time content preview in development

1. Go to your [project’s API settings on manage.sanity.io](https://manage.sanity.io/projects/13zu9heh/settings/api) and create a token with read rights.
2. Copy `.env.development.template` to `.env.development` and paste in the token: `SANITY_READ_TOKEN="yourTokenHere"`.
3. Restart the development server (`ctrl + C` and `npm run dev`).

If you want to disable the preview you can set `watchMode: false` in gatsby-config.js. If you just want to preview published changes you can set `overlayDrafts: false` in gatsby-config.js.

## Deploy changes

Netlify automatically deploys new changes commited to the `master` branch on GitHub. If you want to change the deployment branch you may do so in [build & deploy settings on Netlify](https://www.netlify.com/docs/continuous-deployment/#branches-deploys).

## Get help

[![Slack Community Button](https://slack.sanity.io/badge.svg)](https://slack.sanity.io/)

Join [Sanity’s developer community](https://slack.sanity.io) or ping us [on twitter](https://twitter.com/sanity_io).

## Troubleshooting

Because of a bug in Learna, if project is not closed properly, there will be orphaned node server running, which will prevent you from running the project again. 

To close orphaned server, within terminal:
1. find the process id that listening to port 3333 or 8000
  - netstat -ano | find "LISTENING" | find "3333"
2. The last number will be the pid ie. 14282
3. Kill the task server using the following command with the correct pid. 
  - taskkill /f /pid 14282 