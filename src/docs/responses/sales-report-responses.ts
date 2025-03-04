export const salesReportResponses = {
  generate: {
    201: {
      description: 'Relatório de vendas gerado com sucesso!',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SalesReport',
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
      description: 'Usuário não tem permissão para acessar este recurso.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  list: {
    200: {
      description: 'Relatórios de vendas listados com sucesso!',
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
    },

    204: {
      description: 'Nenhum relatório de vendas foi criado.',
    },

    400: {
      description: 'Erro nos dados enviados.',
    },

    401: {
      description: 'Usuário não autorizado.',
    },

    403: {
      description: 'Usuário não tem permissão para acessar este recurso.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  getSalesReport: {
    200: {
      description: 'Relatório de vendas retornado com sucesso!',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SalesReport',
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
      description: 'Usuário não tem permissão para acessar este recurso.',
    },

    404: {
      description: 'Relatório de vendas não encontrado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },

  download: {
    200: {
      description: 'Download do relatório de vendas realizado com sucesso!',
    },

    400: {
      description: 'Erro nos dados enviados.',
    },

    401: {
      description: 'Usuário não autorizado.',
    },

    403: {
      description: 'Usuário não tem permissão para acessar este recurso.',
    },

    404: {
      description: 'Relatório de vendas não encontrado.',
    },

    500: {
      description: 'Erro interno no servidor.',
    },
  },
};
