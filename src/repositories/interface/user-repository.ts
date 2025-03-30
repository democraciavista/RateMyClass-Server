import { Prisma, type User } from '@prisma/client';

export interface IUserRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  delete: (id: string) => Promise<User>;
  save: (id: string, data: Prisma.UserUpdateInput) => Promise<User>;
  findAll: () => Promise<User[]>;
}
