import { z } from "zod";

export const MaterialRegisterSchema=z.object({
  title:z.string({
    invalid_type_error:'O título precisa ser uma string',
    required_error:'O título é obrigatório'
  }),
    link:z.string({
        invalid_type_error:'O link precisa ser uma string',
        required_error:'O link é obrigatório'
    }),
    userId:z.string({
        invalid_type_error:'O userId precisa ser uma string',
        required_error:'O userId é obrigatório'
    }),
    disciplineId:z.string({
        invalid_type_error:'O disciplineId precisa ser uma string',
        required_error:'O disciplineId é obrigatório'
    })
})


  