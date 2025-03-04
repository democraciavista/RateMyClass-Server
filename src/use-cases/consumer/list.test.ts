import { beforeEach, expect, describe, it } from 'vitest';

import { InMemoryConsumerRepository } from '@repositories/in-memory/in-memory-consumer-repository';

import { createUser } from '@utils/test/create-user';

import { ListConsumerUseCase } from './list';

let consumerRepository: InMemoryConsumerRepository;
let sut: ListConsumerUseCase;

describe('list Use Case', () => {
  beforeEach(() => {
    consumerRepository = new InMemoryConsumerRepository();
    sut = new ListConsumerUseCase(consumerRepository);
  });

  it('should be able list consumers', async () => {
    const [user1, user2] = await Promise.all([createUser(), createUser()]);

    await Promise.all([
      consumerRepository.create({
        fullName: 'John Doe',
        address: 'John Doe Street',
        contact: '99999999999',
        userId: user1.id,
      }),
      await consumerRepository.create({
        fullName: 'John Doe',
        address: 'John Doe Street',
        contact: '99999999999',
        userId: user2.id,
      }),
    ]);

    const { consumers } = await sut.execute();

    expect(consumers.length).toEqual(2);
  });
});
