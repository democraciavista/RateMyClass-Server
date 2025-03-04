import { z } from 'zod';

export const SearchByNameSchema = z.object({
  name: z.coerce.string({
    invalid_type_error: 'O nome deve ser uma string.',
    required_error: 'O nome é obrigatório.',
  }),
});
