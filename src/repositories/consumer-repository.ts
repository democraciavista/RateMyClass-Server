import { Prisma, Consumer } from '@prisma/client';

export interface IConsumerRepository {
  create: (data: Prisma.ConsumerUncheckedCreateInput) => Promise<Consumer>;
  findAll: (name?: string) => Promise<Consumer[]>;
  findByUserId: (userId: string) => Promise<Consumer | null>;
  findById: (id: string) => Promise<Consumer | null>;
  save: (id: string, data: Prisma.ConsumerUpdateInput) => Promise<Consumer>;
  delete: (id: string) => Promise<Consumer>;
}
