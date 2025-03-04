export const orderItemSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    orderId: {
      type: 'string',
      format: 'uuid',
    },
    productId: {
      type: 'string',
      format: 'uuid',
    },
    quantity: {
      type: 'number',
    },
    unitPrice: {
      type: 'number',
      format: 'float',
    },
    subtotal: {
      type: 'number',
      format: 'float',
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
    'orderId',
    'productId',
    'quantity',
    'unitPrice',
    'subtotal',
    'createdAt',
    'updatedAt',
  ],
};
