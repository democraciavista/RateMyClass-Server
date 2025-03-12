import prisma from '@database/index';
import { DisciplinaRepository } from '@repositories/disciplina-repository';


export class PrismaDisciplinaRepository implements DisciplinaRepository {
  async create(data: {
    codigo: string;
    nome: string;
    professor: string;
    centro: string;
    periodo: string;
    tipo: string;
  }) {
    return prisma.disciplina.create({ data });
  }

  async getById(id: string) {
    return prisma.disciplina.findUnique({ where: { id } });
  }

  async getAll() {
    return prisma.disciplina.findMany();
  }

  async update(id: string, data: {
    codigo: string;
    nome: string;
    professor: string;
    centro: string;
    periodo: string;
    tipo: string;
  }) {
    return prisma.disciplina.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.disciplina.delete({ where: { id } });
  }
}