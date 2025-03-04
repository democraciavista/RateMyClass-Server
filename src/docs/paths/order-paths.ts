import { orderResponses } from '@docs/responses/order-responses';

export const orderPaths = {
  '/order': {
    post: {
      tags: ['Order'],
      summary: 'Create a order',
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
              $ref: '#/components/schemas/Order',
            },
            example: {
              consumerId: 'consumer-id',
            },
          },
        },
      },
      responses: {
        ...orderResponses.register,
      },
    },

    get: {
      tags: ['Order'],
      summary: 'List orders',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'query',
          name: 'consumerId',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'status',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'minDate',
          required: false,
          schema: {
            type: 'string',
            format: 'date',
          },
        },
        {
          in: 'query',
          name: 'maxDate',
          required: false,
          schema: {
            type: 'string',
            format: 'date',
          },
        },
        {
          in: 'query',
          name: 'minPrice',
          required: false,
          schema: {
            type: 'number',
          },
        },
        {
          in: 'query',
          name: 'maxPrice',
          required: false,
          schema: {
            type: 'number',
          },
        },
      ],
      responses: {
        ...orderResponses.list,
      },
    },
  },

  '/order/{orderId}': {
    get: {
      tags: ['Order'],
      summary: 'Get a order',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'orderId',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...orderResponses.getOrder,
      },
    },

    patch: {
      tags: ['Order'],
      summary: 'Update a order',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'orderId',
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
              $ref: '#/components/schemas/Order',
            },
          },
        },
      },
      responses: {
        ...orderResponses.save,
      },
    },
  },
};
