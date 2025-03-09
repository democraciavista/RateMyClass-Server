import { beforeEach, expect, describe, it } from 'vitest';
import { compare } from 'bcryptjs';

import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository';

import { AlreadyExistsError } from '@errors/already-exists-error';

import { RegisterUseCase } from './register';
import { EmailVerificationSender } from '@services/email-verification-sender';
import { genToken } from '@utils/genToken';

let userRepository: InMemoryUserRepository;
let sut: RegisterUseCase;
let EmailSender: EmailVerificationSender;
let generateToken: () => Promise<{ token: string; hashedToken: string }>;

describe('Register Use Case', () => {
  beforeEach(() => {
    EmailSender = new EmailVerificationSender();
    userRepository = new InMemoryUserRepository();
    generateToken = genToken;
    sut = new RegisterUseCase(userRepository, EmailSender, generateToken);
  });

  it('should register a new user', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
      course: 'course',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash the password', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
      course: 'course',
    });

    const isThePasswordHashed = await compare('123456', user.password);

    expect(isThePasswordHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com';

    await sut.execute({
      email,
      password: '123456',
      course: 'course',
    });

    await expect(() =>
      sut.execute({
        email,
        password: '123456',
        course: 'course',
      }),
    ).rejects.toBeInstanceOf(AlreadyExistsError);
  });
});
