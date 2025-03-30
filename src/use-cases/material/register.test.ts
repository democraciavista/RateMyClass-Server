import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryMaterialRepository } from '@repositories/in-memory/in-memory-material-repository'; // Substitua pelo caminho correto
import { InMemoryUserRepository } from '@repositories/in-memory/in-memory-user-repository'; // Substitua pelo caminho correto
import { NotFoundError } from '@errors/not-found-error'; // Substitua pelo caminho correto
import { RegisterMaterialUseCase } from './register';

let materialRepository: InMemoryMaterialRepository;
let userRepository: InMemoryUserRepository;
let subjectRepository: InMemoryMaterialRepository;
let sut: RegisterMaterialUseCase;

describe('RegisterMaterial Use Case', () => {
  beforeEach(() => {
    materialRepository = new InMemoryMaterialRepository();
    userRepository = new InMemoryUserRepository();
    subjectRepository = new InMemoryMaterialRepository();
    sut = new RegisterMaterialUseCase(
      materialRepository,
      userRepository,
      subjectRepository,
    );
  });

  it('should register a new material successfully when user and subject exist', async () => {
    const user = {
      id: '1',
      email: 'user@email.com',
      password: 'hashedPassword',
      course: 'course',
    };
    const subject = { id: '1', name: 'Math', professor: 'Professor X' };
    await userRepository.create(user); 
    await subjectRepository.create(subject); 

    const materialData = {
      title: 'Math Notes',
      link: 'http://link-to-material.com',
      userId: user.id,
      subjectId: subject.id,
    };

    const { material } = await sut.execute(materialData);

    expect(material.title).toEqual(materialData.title);
    expect(material.link).toEqual(materialData.link);
    expect(material.userId).toEqual(materialData.userId);
    expect(material.subjectId).toEqual(materialData.subjectId);
  });

  it('should throw NotFoundError when user does not exist', async () => {
    const subject = { id: '1', name: 'Math', professor: 'Professor X' };
    await subjectRepository.create(subject);

    const materialData = {
      title: 'Math Notes',
      link: 'http://link-to-material.com',
      userId: 'non-existent-user-id',
      subjectId: subject.id,
    };

    await expect(() => sut.execute(materialData)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it('should throw NotFoundError when subject does not exist', async () => {
    const user = {
      id: '1',
      email: 'user@email.com',
      password: 'hashedPassword',
      course: 'course',
    };
    await userRepository.create(user); 

    const materialData = {
      title: 'Math Notes',
      link: 'http://link-to-material.com',
      userId: user.id,
      subjectId: 'non-existent-subject-id',
    };

    await expect(() => sut.execute(materialData)).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });
});
