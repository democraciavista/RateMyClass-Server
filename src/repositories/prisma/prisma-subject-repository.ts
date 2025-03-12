import prisma from '@database';
import { NotFoundError } from '@errors/not-found-error';
import { Prisma, Subjects } from '@prisma/client';
import { ISubjectRepository } from '@repositories/interface/subjects-repository';

export class PrismaSubjectsRepository implements ISubjectRepository {
  async findById(id: string) {
    const subject = await prisma.subjects.findUnique({ where: { id } });
    if (!subject) {
      throw new NotFoundError('Matéria não encontrada');
    }
    return subject;
  }
  async create(data: Prisma.SubjectsCreateInput) {
    const subject = await prisma.subjects.create({ data });
    return subject;
  }
  async delete(id: string) {
    const exist = await prisma.subjects.findUnique({ where: { id } });
    if (!exist) {
      throw new NotFoundError('Matéria não encontrada');
    }
    const subject = await prisma.subjects.delete({ where: { id } });
    return subject;
  }
  async update(id: string, data: Prisma.SubjectsUpdateInput) {
    const subject = await prisma.subjects.update({ where: { id }, data });
    return subject;
  }
  async findAll() {
    const subjects = await prisma.subjects.findMany();
    return subjects;
  }
}
