import { consumerPaths } from './paths/consumer-paths';
import { orderItemPaths } from './paths/order-item-paths';
import { orderPaths } from './paths/order-paths';
import { paymentPaths } from './paths/payment-paths';
import { productPaths } from './paths/product-paths';
import { salesReportPaths } from './paths/sales-report-paths';
import { userPaths } from './paths/user-paths';

import { consumerSchema } from './schemas/consumer-schema';
import { orderItemSchema } from './schemas/order-item-schema';
import { orderSchema } from './schemas/order-schema';
import { productSchema } from './schemas/product-schema';
import { salesReportSchema } from './schemas/sales-report-schema';
import { userSchema } from './schemas/user-schema';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Loomi Challenge API.',
    description: 'API for back challenge of Loomi.',
    version: '1.0.0',
  },

  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Local Server',
    },
  ],

  paths: {
    ...userPaths,
    ...consumerPaths,
    ...productPaths,
    ...orderPaths,
    ...orderItemPaths,
    ...salesReportPaths,
    ...paymentPaths,
  },

  components: {
    schemas: {
      User: userSchema,
      Consumer: consumerSchema,
      Product: productSchema,
      Order: orderSchema,
      OrderItem: orderItemSchema,
      SalesReport: salesReportSchema,
    },

    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },

    security: {
      bearerAuth: [],
    },
  },
};
