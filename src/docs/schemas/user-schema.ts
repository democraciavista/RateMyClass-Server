export const userSchema = {
  type: 'object',

  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
    },
    emailVerified: {
      type: 'boolean',
    },
    emailTokenExpiry: {
      type: 'string',
      format: 'date-time',
    },
    emailVerificationToken: {
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
    role: {
      type: 'string',
      enum: ['ADMIN', 'CONSUMER'],
    },
  },

  required: [
    'id',
    'name',
    'email',
    'password',
    'emailVerified',
    'createdAt',
    'updatedAt',
    'role',
  ],
};
