export const productSchema = {
  type: 'object',

  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    price: {
      type: 'number',
      format: 'float',
    },
    stock: {
      type: 'number',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },

  required: [
    'id',
    'name',
    'description',
    'price',
    'stock',
    'createdAt',
    'updatedAt',
  ],
};
