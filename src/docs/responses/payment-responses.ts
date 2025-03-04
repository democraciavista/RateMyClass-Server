export const paymentResponses = {
  pay: {
    200: {
      description: 'Pedido recebido com sucesso!',
    },

    400: {
      description: 'Erro nos dados enviados',
    },

    401: {
      description: 'Você precisa estar autenticado para acessar este recurso',
    },

    403: {
      description: 'Você não tem permissão para acessar este recurso',
    },

    404: {
      description: 'Pedido não encontrado',
    },

    500: {
      description: 'Erro interno no servidor',
    },
  },
};
