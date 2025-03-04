import { userResponses } from '@docs/responses/user-responses';

export const userPaths = {
  '/user': {
    post: {
      tags: ['User'],
      summary: 'Create a new user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
            example: {
              name: 'John Doe',
              email: 'johndoe@email.com',
              password: '123456',
            },
          },
        },
      },
      responses: {
        ...userResponses.register,
      },
    },
  },

  '/user/verify-email': {
    post: {
      tags: ['User'],
      summary: 'Verify user email',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                },
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        ...userResponses.verifyEmail,
      },
    },
  },

  '/user/sessions': {
    post: {
      tags: ['User'],
      summary: 'Authenticate user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                },
                password: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        ...userResponses.authenticate,
      },
    },
  },

  '/user/{userId}': {
    delete: {
      tags: ['User'],
      summary: 'Delete user',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'userId',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        ...userResponses.delete,
      },
    },
  },
};
