import { consumerResponses } from '@docs/responses/consumer-responses';

export const consumerPaths = {
  '/consumer': {
    post: {
      tags: ['Consumer'],
      summary: 'Create a consumer',
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Consumer',
            },
            example: {
              userId: 'user-id',
              fullName: 'Consumer name',
              contact: '81 912345678',
              address: 'Consumer address',
            },
          },
        },
      },
      responses: {
        ...consumerResponses.register,
      },
    },

    get: {
      tags: ['Consumer'],
      summary: 'List consumers',
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        ...consumerResponses.list,
      },
    },
  },

  '/consumer/search': {
    get: {
      tags: ['Consumer'],
      summary: 'Search consumer by name',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'query',
          name: 'name',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...consumerResponses.searchByName,
      },
    },
  },

  '/consumer/{consumerId}': {
    get: {
      tags: ['Consumer'],
      summary: 'Get consumer profile',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'consumerId',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...consumerResponses.getProfile,
      },
    },

    delete: {
      tags: ['Consumer'],
      summary: 'Delete a consumer',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'consumerId',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...consumerResponses.delete,
      },
    },

    patch: {
      tags: ['Consumer'],
      summary: 'Update a consumer',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'consumerId',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Consumer',
            },
            example: {
              fullName: 'Consumer name',
              contact: '81 912345678',
              address: 'Consumer address',
            },
          },
        },
      },
      responses: {
        ...consumerResponses.save,
      },
    },
  },
};
