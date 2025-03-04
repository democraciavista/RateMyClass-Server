import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryConsumerRepository } from '@repositories/in-memory/in-memory-consumer-repository';

import { AlreadyExistsError } from '@errors/already-exists-error';

import { createUser } from '@utils/test/create-user';

import { RegisterConsumerUseCase } from './register';

let consumerRepository: InMemoryConsumerRepository;
let sut: RegisterConsumerUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    consumerRepository = new InMemoryConsumerRepository();
    sut = new RegisterConsumerUseCase(consumerRepository);
  });

  it('should be able register a new consumer', async () => {
    const user = await createUser();

    const { consumer } = await sut.execute({
      fullName: 'John Doe',
      address: 'John Doe Street',
      contact: '99999999999',
      userId: user.id,
    });

    expect(consumer.id).toEqual(expect.any(String));
    expect(consumer.userId).toBe(user.id);
  });

  it('should not be able register a new consumer with an already registered user', async () => {
    const user = await createUser();

    await sut.execute({
      fullName: 'John Doe',
      address: 'John Doe Street',
      contact: '99999999999',
      userId: user.id,
    });

    await expect(
      sut.execute({
        fullName: 'John Doe',
        address: 'John Doe Street',
        contact: '99999999999',
        userId: user.id,
      }),
    ).rejects.toThrow(AlreadyExistsError);
  });
});
