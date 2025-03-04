export const userResponses = {
  register: {
    201: {
      description: 'Usuário criado com sucesso!',
    },

    400: {
      description: 'Erro nos dados enviados.',
    },

    401: {
      description: 'Usuário não autorizado.',
    },

    403: {
      description: 'Usuário não tem permissão para realizar esta ação.',
    },

    409: {
      description: 'Usuário já existe.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },

    503: {
      description: 'Serviço de e-mail indisponível.',
    },
  },

  verifyEmail: {
    200: {
      description: 'E-mail verificado com sucesso!',
    },

    400: {
      description: 'Erro nos dados enviados.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  delete: {
    200: {
      description: 'Usuário deletado com sucesso!',
    },

    400: {
      description: 'Erro nos dados enviados.',
    },

    401: {
      description: 'Usuário não autorizado.',
    },

    403: {
      description: 'Usuário não tem permissão para realizar esta ação.',
    },

    404: {
      description: 'Usuário não encontrado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  authenticate: {
    200: {
      description: 'Usuário autenticado com sucesso!',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User',
            accessToken: {
              type: 'string',
            },
          },
        },
      },
    },
  },

  400: {
    description: 'Erro nos dados enviados.',
  },

  500: {
    description: 'Erro interno no servidor.',
  },
};
