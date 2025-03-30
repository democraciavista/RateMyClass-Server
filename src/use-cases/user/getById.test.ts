import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository'; // Substitua pelo caminho correto
import { NotFoundError } from '@errors/not-found-error'; // Substitua pelo caminho correto
import { User } from '@prisma/client'; // Substitua pelo caminho correto
import { GetByIdUseCase } from './getById';

let userRepository: InMemoryUserRepository;
let sut: GetByIdUseCase;

describe('GetById Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new GetByIdUseCase(userRepository);
  });

  it('should return the user when found', async () => {
    const userData: User = {
      id: '1',
      email: 'johndoe@email.com',
      password: 'hashedPassword',
      course: 'course',
      createdAt: new Date(),
      updatedAt: new Date(),
      emailTokenExpiry: new Date(),
      emailVerified: false,
      emailVerificationToken: 'emailVerificationToken',
      resetPasswordToken: 'resetPasswordToken',
      resetPasswordTokenExpiry: new Date(),
      role: 'STUDENT',
    };

    await userRepository.create(userData);

    const { user } = await sut.execute(userData.id);

    expect(user.id).toEqual(userData.id);
    expect(user.email).toEqual(userData.email);
    expect(user.course).toEqual(userData.course);
  });

  it('should throw NotFoundError when user is not found', async () => {
    const invalidId = 'non-existent-id';

    await expect(() => sut.execute(invalidId)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
