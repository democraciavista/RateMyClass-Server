import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryConsumerRepository } from '@repositories/in-memory/in-memory-consumer-repository';

import { createUser } from '@utils/test/create-user';

import { NotFoundError } from '@errors/not-found-error';

import { GetProfileConsumerUseCase } from './get-profile';

let consumerRepository: InMemoryConsumerRepository;
let sut: GetProfileConsumerUseCase;

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    consumerRepository = new InMemoryConsumerRepository();
    sut = new GetProfileConsumerUseCase(consumerRepository);
  });

  it('should be able get profile of consumer', async () => {
    const user = await createUser();

    const response = await consumerRepository.create({
      fullName: 'John Doe',
      address: 'John Doe Street',
      contact: '99999999999',
      userId: user.id,
    });

    const { consumer } = await sut.execute(response.id);

    expect(consumer.id).toEqual(expect.any(String));
    expect(consumer.userId).toBe(user.id);
  });

  it('should not be able get profile of a non-existing consumer', async () => {
    await expect(sut.execute('non-existing-consumer-id')).rejects.toThrow(
      NotFoundError,
    );
  });
});
