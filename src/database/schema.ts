export const MAIN_COLLECTION_SCHEMA = {
  title: 'questions schema',
  version: 0,
  description: 'all the questions will be here',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    markdown: {
      type: 'string',
    },
    toPass: {
      type: 'integer',
      default: 100,
    },
    testCases: {
      type: 'array',
      //   maxItems: 5,
      //   uniqueItems: true,
      items: {
        type: 'object',
        properties: {
          input: {
            type: 'string',
          },
          output: {
            type: 'string',
          },
        },
      },
    },
  },
  required: ['title', 'markdown', 'testCases'],
}
