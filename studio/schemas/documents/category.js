export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'projectFilter',
      type: 'boolean',
      title:'Project Filter'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
 
  ]
}
