import { salesReportResponses } from '@docs/responses/sales-report-responses';

export const salesReportPaths = {
  '/sales-report': {
    post: {
      tags: ['Sales Report'],
      summary: 'Generate sales report',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'query',
          name: 'minDate',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'maxDate',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...salesReportResponses.generate,
      },
    },

    get: {
      tags: ['Sales Report'],
      summary: 'List sales reports',
      security: [
        {
          bearerAuth: [],
        },
      ],
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/SalesReport',
            },
          },
        },
      },
      responses: {
        ...salesReportResponses.list,
      },
    },
  },

  '/sales-report/id/{salesReportId}': {
    get: {
      tags: ['Sales Report'],
      summary: 'Get sales report by id',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'salesReportId',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SalesReport',
          },
        },
      },
      responses: {
        ...salesReportResponses.getSalesReport,
      },
    },
  },

  '/sales-report/download/{salesReportId}': {
    get: {
      tags: ['Sales Report'],
      summary: 'Download sales report',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'salesReportId',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...salesReportResponses.download,
      },
    },
  },
};
