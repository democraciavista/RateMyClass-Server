import { paymentResponses } from '@docs/responses/payment-responses';

export const paymentPaths = {
  '/payment/{orderId}': {
    patch: {
      tags: ['Payment'],
      summary: 'Pay an order',
      parameters: [
        {
          in: 'path',
          name: 'orderId',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'deny',
          required: false,
          schema: {
            type: 'boolean',
          },
        },
      ],
      responses: {
        ...paymentResponses.pay,
      },
    },
  },
};
