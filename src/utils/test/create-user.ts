import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository';

const userRepository = new InMemoryUserRepository();

export async function createUser() {
  const random = Math.floor(Math.random() * 1000);

  const user = await userRepository.create({
    name: 'John Doe',
    email: `${random}@email.com`,
    password: 'password',
  });

  return user;
}
