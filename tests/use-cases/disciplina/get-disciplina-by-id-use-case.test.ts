import { GetDisciplinaByIdUseCase } from '../../../src/use-cases/disciplina/get-disciplina-by-id-use-case';
import { DisciplinaRepository } from '../../../src/repositories/disciplina-repository';

// Mock do repositório
const mockDisciplinaRepository: DisciplinaRepository = {
  create: jest.fn(),
  getById: jest.fn().mockResolvedValue({ id: '1', nome: 'Matemática' }),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('GetDisciplinaByIdUseCase', () => {
  it('deve retornar uma disciplina por id', async () => {
    const getDisciplinaByIdUseCase = new GetDisciplinaByIdUseCase(mockDisciplinaRepository);

    const result = await getDisciplinaByIdUseCase.execute({ id: '1' });

    expect(mockDisciplinaRepository.getById).toHaveBeenCalledWith('1');

    expect(result).toEqual({ id: '1', nome: 'Matemática' });
  });
});