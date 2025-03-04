import { productResponses } from '@docs/responses/product-responses';

export const productPaths = {
  '/product': {
    post: {
      tags: ['Product'],
      summary: 'Create a product',
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
              $ref: '#/components/schemas/Product',
            },
            example: {
              name: 'Product name',
              description: 'Product description',
              price: 100.0,
              stock: 10,
            },
          },
        },
      },
      responses: {
        ...productResponses.register,
      },
    },

    get: {
      tags: ['Product'],
      summary: 'List products',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'query',
          name: 'name',
          required: false,
          schema: {
            type: 'string',
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
          name: 'stock',
          required: false,
          schema: {
            type: 'number',
          },
        },
      ],
      responses: {
        ...productResponses.list,
      },
    },
  },

  '/product/{productId}': {
    delete: {
      tags: ['Product'],
      summary: 'Delete a product',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'productId',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...productResponses.delete,
      },
    },

    get: {
      tags: ['Product'],
      summary: 'Get a product',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'productId',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...productResponses.getProduct,
      },
    },

    patch: {
      tags: ['Product'],
      summary: 'Update a product',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'productId',
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
              $ref: '#/components/schemas/Product',
            },
            example: {
              name: 'Product name',
              description: 'Product description',
              price: 100.0,
              stock: 10,
            },
          },
        },
      },
      responses: {
        ...productResponses.save,
      },
    },
  },
};
