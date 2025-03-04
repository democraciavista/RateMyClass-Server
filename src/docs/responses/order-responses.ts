export const orderResponses = {
  register: {
    201: {
      description: 'Pedido criado com sucesso!',
    },

    400: {
      description: 'Erro nos dados enviados.',
    },

    401: {
      description: 'Usuário não autorizado.',
    },

    4003: {
      description: 'Usuário não tem permissão para realizar esta ação.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  list: {
    200: {
      description: 'Listagem de pedidos',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Order',
            },
          },
        },
      },
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

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  getOrder: {
    200: {
      description: 'Listagem de pedidos',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Order',
          },
        },
      },
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
      description: 'Pedido não encontrado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  save: {
    200: {
      description: 'Pedido salvo com sucesso!',
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
      description: 'Pedido não encontrado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },
};
