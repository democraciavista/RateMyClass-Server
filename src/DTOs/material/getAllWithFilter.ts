import { z } from "zod";

export const MaterialGetWithFilterSchema= z.object({
    userId:z.string(),
   title:z.string(),
    disciplina:z.string(),
    curso:z.string(),
    professor:z.string(),
    ordem:z.enum(['asc','desc']),
    ordemBy:z.string()
}).partial()