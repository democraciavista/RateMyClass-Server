import { NotFoundError } from '@errors/not-found-error';
import { Material, Prisma, Subjects, User } from '@prisma/client';
import { IMaterialRepository } from '@repositories/interface/material-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryMaterialRepository implements IMaterialRepository {
  public items: (Material & { user: User; subject: Subjects })[] = [];
  async create(data: Prisma.MaterialUncheckedCreateInput) {
    const material: Material & { user: User; subject: Subjects } = {
      id: randomUUID(),
      title: data.title,
      link: data.link,
      createdAt: new Date(),
      updatedAt: new Date(),
      subjectId: data.subjectId || randomUUID(),
      userId: data.userId || randomUUID(),
      subject: {
        id: data.subjectId || randomUUID(),
        name: 'Matemática',
        createdAt: new Date(),
        updatedAt: new Date(),
        couse: 'Sistemas de Informação',
        professor: 'João',
      },
      user: {
        id: data.userId || randomUUID(),
        email: 'oii@gmail.com',
        password: '123456',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'STUDENT',
        course: 'Sistemas de Informação',
        emailTokenExpiry: null,
        emailVerificationToken: null,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    };

    this.items.push(material);
    return material;
  }
  async findById(id: string) {
    const material = this.items.find((item) => item.id === id);
    if (!material) {
      return null;
    }
    return material;
  }
  async findByTitle(title: string) {
    const materials = this.items.filter((item) => item.title.includes(title));
    return materials;
  }
  async delete(id: string) {
    const materialIndex = this.items.findIndex((item) => item.id === id);
    if (materialIndex === -1) {
      throw new NotFoundError('Material não encontrado');
    }
    const material = this.items[materialIndex];
    this.items.splice(materialIndex, 1);
    return material;
  }
  async update(id: string, data: Prisma.MaterialUpdateInput) {
    const materialIndex = this.items.findIndex((item) => item.id === id);
    if (materialIndex === -1) {
      throw new NotFoundError('Material não encontrado');
    }
    const material = this.items[materialIndex];
    this.items[materialIndex] = {
      ...material,
      ...(data as Material),
      updatedAt: new Date(),
    };
    return this.items[materialIndex];
  }
  async findAll() {
    return this.items;
  }
  async findByFiltres(
    title?: string,
    disciplina?: string,
    curso?: string,
    professor?: string,
    ordem?: Prisma.SortOrder,
    ordemBy?: string,
  ) {
    let materials = this.items;
    if (title) {
      materials = materials.filter((material) => material.title === title);
    }
    if (disciplina) {
      materials = materials.filter(
        (material) => material.subjectId === disciplina,
      );
    }
    if (curso) {
      materials = materials.filter(
        (material) => material.subject.couse === curso,
      );
    }
    if (professor) {
      materials = materials.filter(
        (material) => material.subject.professor === professor,
      );
    }
    if (ordem && ordemBy) {
      materials = materials.sort((a, b) => {
        if (ordem === 'asc') {
          return a[
            ordemBy as keyof (Material & { user: User; subject: Subjects })
          ] > b[ordemBy as keyof (Material & { user: User; subject: Subjects })]
            ? 1
            : -1;
        }
        return a[
          ordemBy as keyof (Material & { user: User; subject: Subjects })
        ] < b[ordemBy as keyof (Material & { user: User; subject: Subjects })]
          ? 1
          : -1;
      });
    }
    return materials;
  }
  async findFavoriteByFiltres(
    userId: string,
    title?: string,
    disciplina?: string,
    curso?: string,
    professor?: string,
    ordem?: Prisma.SortOrder,
    ordemBy?: string,
  ) {
    let materials = this.items;
    if (title) {
      materials = materials.filter((material) => material.title === title);
    }
    if (disciplina) {
      materials = materials.filter(
        (material) => material.subjectId === disciplina,
      );
    }
    if (curso) {
      materials = materials.filter(
        (material) => material.subject.couse === curso,
      );
    }
    if (professor) {
      materials = materials.filter(
        (material) => material.subject.professor === professor,
      );
    }
    if (ordem && ordemBy) {
      materials = materials.sort((a, b) => {
        if (ordem === 'asc') {
          return a[
            ordemBy as keyof (Material & { user: User; subject: Subjects })
          ] > b[ordemBy as keyof (Material & { user: User; subject: Subjects })]
            ? 1
            : -1;
        }
        return a[
          ordemBy as keyof (Material & { user: User; subject: Subjects })
        ] < b[ordemBy as keyof (Material & { user: User; subject: Subjects })]
          ? 1
          : -1;
      });
    }
    materials = materials.filter((material) => material.user.id === userId);
    return materials;
  }
}
