export default {
    name: 'accolade',
    type: 'document',
    title: 'Accolade',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title'
      },
      {
        name: 'date',
        type: 'date',
        options:{
            dateFormat:'YYYY'
        },
        title: 'Date'
      },
      {
        name: 'event',
        title: 'Event',
        type: 'string',
      },
      {
        name: 'address',
        title: 'Address',
        type: 'string',
      },
      {
        name: 'linkTo',
        title: 'URL',
        type: 'url',
      }
    ],
    orderings: [
      {
        title: 'Year',
        name: 'date',
        by: [
          {field: 'date', direction: 'desc'}
        ]
      }
    ],
    preview: {
      select: {
        title: 'title',
        date:'date',
        event:'event',
        address:'address',
      },
      prepare(selection) {
        const {title,date,event='',address=''} = selection; 
        return {
          title: `${date.split('-')[0]}: ${title}`,
          subtitle: event,
          description: address,
        }
      }
    }
  }
  