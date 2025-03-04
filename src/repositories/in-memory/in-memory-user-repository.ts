import { $Enums, Prisma, User } from '@prisma/client';
import { IUserRepository } from '@repositories/user-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryUserRepository implements IUserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID() as string,
      name: data.name,
      email: data.email,
      password: data.password,
      emailVerificationToken: data.emailVerificationToken || null,
      emailTokenExpiry: new Date(data.emailTokenExpiry!),
      emailVerified: data.emailVerified || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: data.role || 'CONSUMER',
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
      throw new Error('User not found');
    }

    const user = this.items[userIndex];

    this.items.splice(userIndex, 1);

    return user;
  }

  async save(user: User) {
    const userIndex = this.items.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.items[userIndex] = user;
    }

    return user;
  }
}
