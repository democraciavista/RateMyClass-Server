import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository';
import { VerifyPasswordUseCase } from './verify-password';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '@errors/not-found-error';
import { InvalidTokenError } from '@errors/invalid-token-error';
import bcryptjs from 'bcryptjs';


let userRepository: InMemoryUserRepository;
let sut: VerifyPasswordUseCase;

describe('Verify Password Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new VerifyPasswordUseCase(userRepository);
  });

  it('should successfully update the user password if the token is valid', async () => {
    const validToken = 'token';
    const hashToken = await bcryptjs.hash(validToken, 8);
    await userRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      course: 'course',
      resetPasswordToken: hashToken,
      resetPasswordTokenExpiry: new Date(Date.now() + 3600000),
    });

    const data = {
      email: 'johndoe@email.com',
      token: 'token',
      newPassword: 'new-password',
    };

    const result = await sut.execute(data);

    expect(result.user.password).not.toEqual('123456');
    expect(result.user.password).not.toEqual(data.newPassword);
  });

  it('should throw NotFoundError if the user does not exist', async () => {
    const data = {
      email: 'nonexistent@email.com',
      token: 'token',
      newPassword: 'new-password',
    };

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw InvalidTokenError if the token is invalid', async () => {
    await userRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      course: 'course',
      resetPasswordToken: 'hashed-token',
      resetPasswordTokenExpiry: new Date(Date.now() + 3600000),
    });

    const data = {
      email: 'johndoe@email.com',
      token: 'invalid-token',
      newPassword: 'new-password',
    };

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      InvalidTokenError,
    );
  });

  it('should throw InvalidTokenError if the token is expired', async () => {
    const user = await userRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      course: 'course',
      resetPasswordToken: 'hashed-token',
      resetPasswordTokenExpiry: new Date(Date.now() - 3600000),
    });

    const data = {
      email: 'johndoe@email.com',
      token: 'token',
      newPassword: 'new-password',
    };

    await expect(() => sut.execute(data)).rejects.toBeInstanceOf(
      InvalidTokenError,
    );
  });

  it('should correctly validate the token', async () => {
    const validToken = 'token';
    const hashToken = await bcryptjs.hash(validToken, 8);
    const user = await userRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      course: 'course',
      resetPasswordToken: hashToken,
      resetPasswordTokenExpiry: new Date(Date.now() + 3600000),
    });

    const compareMock = vi.spyOn(bcryptjs, 'compare').mockImplementation(() => Promise.resolve(true));

    const data = {
      email: 'johndoe@email.com',
      token: 'token',
      newPassword: 'new-password',
    };

    const result = await sut.execute(data);

    expect(compareMock).toHaveBeenCalledWith(
      data.token,
      user.resetPasswordToken,
    );
    expect(result.user.password).not.toEqual('123456');

    compareMock.mockRestore();
  });
});
