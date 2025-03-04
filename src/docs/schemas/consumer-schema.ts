export const consumerSchema = {
  type: 'object',

  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    userId: {
      type: 'string',
      format: 'uuid',
    },
    fullName: {
      type: 'string',
    },
    contact: {
      type: 'string',
    },
    address: {
      type: 'string',
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
    'userId',
    'fullName',
    'contact',
    'address',
    'createdAt',
    'updatedAt',
  ],
};
