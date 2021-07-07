// import {MdPerson} from 'react-icons/md'

export default {
  name: 'person',
  type: 'document',
  title: 'Person',
  fieldsets: [
    {
      name: 'social',
      title: 'Social media handles',
      options: {collapsible: true, collapsed: false}
    }
  ],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontend will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'figure'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'bioPortableText',
      options: {collapsible: true, collapsed: false}
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      title: 'Website',
      name: 'website',
      type: 'string',
      fieldset: 'social'
    },
    {
      title: 'Twitter',
      name: 'twitter',
      type: 'string',
      fieldset: 'social'
    },
    {
      title: 'Instagram',
      name: 'instagram',
      type: 'string',
      fieldset: 'social'
    },
    {
      title: 'Linkedin',
      name: 'linkedin',
      type: 'string',
      fieldset: 'social'
    },
    {
      title: 'Github',
      name: 'github',
      type: 'string',
      fieldset: 'social'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
