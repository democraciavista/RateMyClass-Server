import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository';
import { GetAllUserUseCase } from './getAll';
import { beforeEach, describe, expect, it } from 'vitest';

let userRepository: InMemoryUserRepository;
let sut: GetAllUserUseCase;

describe('Get All Users Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new GetAllUserUseCase(userRepository);
  });

  it('should return all users', async () => {
    await userRepository.create({
      email: 'user1@email.com',
      password: 'password1',
      course: 'course1',
    });

    await userRepository.create({
      email: 'user2@email.com',
      password: 'password2',
      course: 'course2',
    });

    const result = await sut.execute();

    expect(result.users).toHaveLength(2);
    expect(result.users[0].email).toBe('user1@email.com');
    expect(result.users[1].email).toBe('user2@email.com');
  });

  it('should return an empty array if no users exist', async () => {
    const result = await sut.execute();

    expect(result.users).toEqual([]);
  });
});
