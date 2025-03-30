import { beforeEach, describe, expect, it } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository';
import { NotFoundError } from '@errors/not-found-error';
import { InvalidTokenError } from '@errors/invalid-token-error';
import { VerifyEmailUseCase } from './verify-email';
import { AlreadyExistsError } from '@errors/already-exists-error';

let userRepository: InMemoryUserRepository;
let sut: VerifyEmailUseCase;
let validUserEmail: string;
let validToken: string;

describe('Verify Email Use Case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    sut = new VerifyEmailUseCase(userRepository);

    validToken = 'token';
    validUserEmail = 'johndoe@email.com';

    const hashToken = await hash(validToken, 8);

    await userRepository.create({
      email: validUserEmail,
      password: '123456',
      emailTokenExpiry: new Date(Date.now() + 3600000),
      emailVerificationToken: hashToken,
      course: 'course',
    });
  });

  it('should not verify email if user does not exist', async () => {
    await expect(() =>
      sut.execute({
        email: 'wrong@email.com',
        token: validToken,
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should not verify email with an incorrect token', async () => {
    await expect(() =>
      sut.execute({
        email: validUserEmail,
        token: 'wrong-token',
      }),
    ).rejects.toBeInstanceOf(InvalidTokenError);
  });

  it('should verify email', async () => {
    const result = await sut.execute({
      email: validUserEmail,
      token: validToken,
    });

    expect(result.user.emailVerified).toBe(true);
  });

  it('should not verify email if email is already verified', async () => {
    const expiredTokenUser = await userRepository.create({
      email: 'expiddred@email.com',
      password: '123456',
      course: 'course',
      emailTokenExpiry: new Date(Date.now() - 1000),
      emailVerificationToken: await hash('expired-token', 8),
      emailVerified: true,
    });
    await expect(() =>
      sut.execute({
        email: validUserEmail,
        token: validToken,
      }),
    ).rejects.toBeInstanceOf(AlreadyExistsError);
  });

  it('should not verify email if token is expired', async () => {
    const expiredTokenUser = await userRepository.create({
      email: 'expired@email.com',
      password: '123456',
      course: 'course',
      emailTokenExpiry: new Date(Date.now() - 1000),
      emailVerificationToken: await hash('expired-token', 8),
    });

    await expect(() =>
      sut.execute({
        email: expiredTokenUser.email,
        token: 'expired-token',
      }),
    ).rejects.toBeInstanceOf(InvalidTokenError);
  });
});
