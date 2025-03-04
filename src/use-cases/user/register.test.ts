import { beforeEach, expect, describe, it } from 'vitest';
import { compare } from 'bcryptjs';

import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository';

import { AlreadyExistsError } from '@errors/already-exists-error';

import { RegisterUseCase } from './register';

let userRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(userRepository);
  });

  it('should register a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toBe('John Doe');
  });

  it('should hash the password', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const isThePasswordHashed = await compare('123456', user.password);

    expect(isThePasswordHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AlreadyExistsError);
  });
});
