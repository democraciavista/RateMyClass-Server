export const consumerResponses = {
  register: {
    201: {
      description: 'Cliente criado com sucesso!',
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
      description: 'Cliente já existe.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  list: {
    200: {
      description: 'Listagem de clientes.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Consumer',
            },
          },
        },
      },
    },

    204: {
      description: 'Nenhum cliente foi criado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  getProfile: {
    200: {
      description: 'Perfil do cliente.',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Consumer',
          },
        },
      },
    },

    400: {
      description: 'Erro nos dados enviados.',
    },

    404: {
      description: 'Cliente não encontrado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  searchByName: {
    200: {
      description: 'Clientes encontrados.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Consumer',
            },
          },
        },
      },
    },
  },

  save: {
    200: {
      description: 'Cliente atualizado com sucesso!',
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
      description: 'Cliente não encontrado.',
    },

    409: {
      description: 'Cliente já existe.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  delete: {
    200: {
      description: 'Cliente deletado com sucesso!',
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
      description: 'Cliente não encontrado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },
};
