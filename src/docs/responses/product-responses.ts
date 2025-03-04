export const productResponses = {
  register: {
    201: {
      description: 'Produto criado com sucesso!',
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
      description: 'Listagem de produtos.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },
    },

    204: {
      description: 'Nenhum produto foi criado.',
    },

    400: {
      description: 'Erro nos dados enviados.',
    },

    401: {
      description: 'Usuário não autorizado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  getProduct: {
    200: {
      description: 'Produto encontrado.',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Product',
          },
        },
      },
    },

    400: {
      description: 'Erro nos dados enviados.',
    },

    404: {
      description: 'Produto não encontrado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  save: {
    200: {
      description: 'Produto salvo com sucesso!',
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
      description: 'Produto não encontrado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  delete: {
    200: {
      description: 'Produto deletado com sucesso!',
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
      description: 'Produto não encontrado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },
};
