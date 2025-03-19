import { Prisma, User } from '@prisma/client';
import { IUserRepository } from '@repositories/interface/user-repository';
import { NotFoundError } from 'errors/not-found-error';
import { randomUUID } from 'node:crypto';

export class InMemoryUserRepository implements IUserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID() as string,
      email: data.email,
      password: data.password,
      emailVerificationToken: data.emailVerificationToken || null,
      emailTokenExpiry: new Date(data.emailTokenExpiry!),
      resetPasswordToken: data.resetPasswordToken || null,
      resetPasswordTokenExpiry: new Date(data.resetPasswordTokenExpiry!),
      emailVerified: data.emailVerified || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: data.role || 'STUDENT',
      course: data.course || 'Sistemas de Informação',
    };

    this.items.push(user);

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async delete(id: string) {
    const userIndex = this.items.findIndex((item) => item.id === id);

    if (userIndex === -1) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const user = this.items[userIndex];

    this.items.splice(userIndex, 1);

    return user;
  }

  async save(id: string, user: Prisma.UserUpdateInput) {
    const userIndex = this.items.findIndex((item) => item.id === id);

    if (userIndex >= 0) {
      this.items[userIndex] = {
        ...this.items[userIndex],
        ...(user as User),
        updatedAt: new Date(),
      };
    }

    return this.items[userIndex];
  }
  async findAll() {
    return this.items;
  }
}
