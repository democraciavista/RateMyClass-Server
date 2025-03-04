export const orderItemResponses = {
  register: {
    201: {
      description: 'Item do pedido criado com sucesso!',
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

  list: {
    200: {
      description: 'Itens do pedido listados com sucesso!',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/OrderItem',
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

  save: {
    200: {
      description: 'Item do pedido atualizado com sucesso!',
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

  delete: {
    200: {
      description: 'Item do pedido deletado com sucesso!',
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
};
