export const salesReportSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    period: {
      type: 'string',
    },
    total: {
      type: 'number',
      format: 'float',
    },
    products: {
      type: 'number',
    },
    path: {
      type: 'string',
      format: 'url',
    },
  },
  required: ['id', 'period', 'total', 'products', 'path'],
};
