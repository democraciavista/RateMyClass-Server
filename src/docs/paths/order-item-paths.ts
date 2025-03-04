import { orderItemResponses } from '@docs/responses/order-item-responses';

export const orderItemPaths = {
  '/order-item': {
    post: {
      tags: ['Order Item'],
      summary: 'Create a order item',
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
              $ref: '#/components/schemas/OrderItem',
            },
            example: {
              orderId: 'order-id',
              productId: 'product-id',
              quantity: 10,
              unitPrice: 100.0,
            },
          },
        },
      },
      responses: {
        ...orderItemResponses.register,
      },
    },
  },

  '/order-item/{orderId}': {
    get: {
      tags: ['Order Item'],
      summary: 'List order items',
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
        ...orderItemResponses.list,
      },
    },
  },

  '/order-item/{orderItemId}': {
    patch: {
      tags: ['Order Item'],
      summary: 'Update a order item',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'orderItemId',
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
              $ref: '#/components/schemas/OrderItem',
            },
            example: {
              quantity: 10,
              unitPrice: 100.0,
            },
          },
        },
      },
      responses: {
        ...orderItemResponses.save,
      },
    },

    delete: {
      tags: ['Order Item'],
      summary: 'Delete a order item',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'orderItemId',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...orderItemResponses.delete,
      },
    },
  },
};
