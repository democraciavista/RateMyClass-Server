import { beforeEach, expect, describe, it } from 'vitest';
import { hash } from 'bcryptjs';

import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository';

import { InvalidCredentialsError } from '@errors/invalid-credentials-error';

import { AuthenticateUseCase } from './authenticate';

let userRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(userRepository);
  });

  it('should authenticate a user', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toBe('John Doe');
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
