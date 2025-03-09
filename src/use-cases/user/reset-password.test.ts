import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository';
import { ResetPasswordUseCase } from './reset-password';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '@errors/not-found-error';

const mockEmailVerificationSender = {
  sendPasswordResetEmail: vi.fn(),
};

let userRepository: InMemoryUserRepository;
let sut: ResetPasswordUseCase;

describe('ResetPasswordUseCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new ResetPasswordUseCase(
      userRepository,
      mockEmailVerificationSender as any,
      vi
        .fn()
        .mockResolvedValue({ token: '123456', hashedToken: 'hashedToken123' }),
    );
  });

  it('should send a password reset email and update user', async () => {
    const user = await userRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      emailVerified: true,
      course: 'course',
    });

    const result = await sut.execute({ email: user.email });

    expect(result.user.id).toEqual(user.id);
    expect(result.user.resetPasswordToken).toBe('hashedToken123');
  });

  it('should not reset password if user does not exist', async () => {
    await expect(() =>
      sut.execute({ email: 'nonexistent@email.com' }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should not reset password if email is not verified', async () => {
    const user = await userRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      emailVerified: false,
      course: 'course',
    });

    await expect(() =>
      sut.execute({ email: user.email }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
