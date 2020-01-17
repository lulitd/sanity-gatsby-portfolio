export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e2245e5915f40736c05a0ab',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-portfolio-studio-wfyaia8f',
                  apiId: 'ce712ad5-9f8d-4291-be2a-8b7e68109039'
                },
                {
                  buildHookId: '5e2245e5c1f514d0e5ad53cb',
                  title: 'Portfolio Website',
                  name: 'sanity-gatsby-portfolio-web-kcxetz8b',
                  apiId: '7b1fd26c-9a69-488c-9d56-3c374831686e'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/lulitd/sanity-gatsby-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://sanity-gatsby-portfolio-web-kcxetz8b.netlify.com',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
