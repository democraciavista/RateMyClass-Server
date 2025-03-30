import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository';
import { DeleteUseCase } from './delete';
import { beforeEach, describe, expect, it } from 'vitest';
import { NotFoundError } from '@errors/not-found-error';

let userRepository: InMemoryUserRepository;
let sut: DeleteUseCase;

describe('Delete Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new DeleteUseCase(userRepository);
  });

  it('should delete a user', async () => {
    const user = await userRepository.create({
      email: 'johndoe@email.com',
      password: '123456',
      course: 'course',
    });
    const result = await sut.execute(user.id);
    expect(result.user.id).toEqual(user.id);
  });
  it('should not delete a user that does not exist', async () => {
    await expect(() => sut.execute('fsdsdf')).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
