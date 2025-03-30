import { beforeEach, expect, describe, it } from 'vitest';
import { hash } from 'bcryptjs';

import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository';

import { InvalidCredentialsError } from '@errors/invalid-credentials-error';

import { AuthenticateUseCase } from './authenticate';
import { genToken } from '@utils/genToken';
import { EmailVerificationSender } from '@services/email-verification-sender';

let userRepository: InMemoryUserRepository;
let emailVerificationSender: EmailVerificationSender;
let sut: AuthenticateUseCase;
let generatedToken: () => Promise<{ token: string; hashedToken: string }>;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    emailVerificationSender = new EmailVerificationSender();
    generatedToken = genToken;
    sut = new AuthenticateUseCase(
      userRepository,
      emailVerificationSender,
      generatedToken,
    );
  });

  it('should authenticate a user', async () => {
    await userRepository.create({
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
      course: 'course',
      emailVerified: true,
    });

    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
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
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
      course: 'course',
      emailVerified: true,
    });

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
