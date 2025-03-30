import { GetAllDisciplinasUseCase } from '../../../src/use-cases/disciplina/get-all-disciplinas-use-case';
import { DisciplinaRepository } from '../../../src/repositories/disciplina-repository';

// Mock do repositório
const mockDisciplinaRepository: DisciplinaRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn().mockResolvedValue([
    { id: '1', nome: 'Matemática' },
    { id: '2', nome: 'Física' },
  ]),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('GetAllDisciplinasUseCase', () => {
  it('deve retornar todas as disciplinas', async () => {
    const getAllDisciplinasUseCase = new GetAllDisciplinasUseCase(mockDisciplinaRepository);

    const result = await getAllDisciplinasUseCase.execute();

    // Verifica se o repositório foi chamado corretamente
    expect(mockDisciplinaRepository.getAll).toHaveBeenCalled();

    // Verifica se o resultado está correto
    expect(result).toEqual([
      { id: '1', nome: 'Matemática' },
      { id: '2', nome: 'Física' },
    ]);
  });
});