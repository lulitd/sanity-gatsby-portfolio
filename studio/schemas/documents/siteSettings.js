export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish'
  ],
  fieldsets: [
    {
     name: 'jumbotron', 
     title: 'Jumbotron Settings',
     options: {collapsible: true, collapsed: false}
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name:'logo',
      type:'image',
      title:'Logo',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your portfolio for search engines and social media.'
    },
    {
      name: 'jumboDescription',
      type: 'text',
      title: 'Jumbotron Description',
      description: 'This is the description that appears in the header of the index page.',
      fieldset:'jumbotron'
    },
    {
      name: 'jumboName',
      type: 'text',
      title: 'Jumbotron Name',
      description: 'This is the name that appears in the jumbotron of index page.',
      fieldset:'jumbotron'
    },
    {
      name: 'jumboTag',
      type: 'text',
      title: 'Jumbotron Tag',
      description: 'This is the tag that appears in the jumbotron of index page.',
      fieldset:'jumbotron'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your portfolio.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publish an author and set a reference to them here.',
      title: 'Author',
      to: [{type: 'person'}]
    }
  ]
}
