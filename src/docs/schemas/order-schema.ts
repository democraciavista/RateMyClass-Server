import { $Enums } from '@prisma/client';

export const orderSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    consumerId: {
      type: 'string',
      format: 'uuid',
    },
    status: {
      type: 'string',
      enum: $Enums.OrderStatus,
    },
    total: {
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
  required: ['id', 'consumerId', 'status', 'total', 'createdAt', 'updatedAt'],
} as const;
