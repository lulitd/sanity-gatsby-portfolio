import {format,parseISO} from 'date-fns'

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fieldsets: [
    {
      name: 'publishing',
      title: 'Publishing Info',
      collapsible: true,
      collapsed: true
    },
    {
      name: 'relatedContent',
      title: 'Related Content',
      collapsible: true,
      collapsed: true
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'projectPortableText'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'publishing',
      description: 'Some frontend will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      description: 'You can use this field to schedule posts where you show them',
      type: 'datetime',
      fieldset: 'publishing'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
      fieldset: 'publishing'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      fieldset: 'relatedContent'
    },
    {
      name: 'relatedProjects',
      title: 'Related projects',
      type: 'array',
      of: [{type: 'reference', to: {type: 'project'}}],
      fieldset: 'relatedContent'
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare ({title = 'No title', publishedAt, slug = {}, media}) {
      const dateSegment = format(parseISO(publishedAt), 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
