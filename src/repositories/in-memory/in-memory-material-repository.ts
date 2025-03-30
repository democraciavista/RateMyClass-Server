import { NotFoundError } from '@errors/not-found-error';
import { Material, Prisma, Discipline, User } from '@prisma/client';
import { IMaterialRepository } from '@repositories/interface/material-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryMaterialRepository implements IMaterialRepository {
  public items: (Material & { user: User; discipline: Discipline })[] = [];
  async create(data: Prisma.MaterialUncheckedCreateInput) {
    const material: Material & { user: User; discipline: Discipline } = {
      id: randomUUID(),
      title: data.title,
      link: data.link,
      createdAt: new Date(),
      updatedAt: new Date(),
      disciplineId: data.disciplineId || randomUUID(),
      userId: data.userId || randomUUID(),
      discipline: {
        id: data.disciplineId || randomUUID(),
        name: 'Matemática',
        createdAt: new Date(),
        updatedAt: new Date(),
        course: 'Sistemas de Informação',
        professor: 'João',
        center: 'CTG',
        code: 'MAT101',
        period: 1,
        hours: 60,
        type: 'ELECTIVE_FREE',
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
      throw new NotFoundError('Material not found');
    }
    return material;
  }
  async findByTitle(title: string) {
    const materials = this.items.filter((item) => item.title.includes(title));
    return materials;
  }
  async delete(id: string) {
    const materialIndex = this.items.findIndex((item) => item.id === id);
    const material = this.items[materialIndex];
    this.items.splice(materialIndex, 1);
    return material;
  }
  async update(id: string, data: Prisma.MaterialUpdateInput) {
    const materialIndex = this.items.findIndex((item) => item.id === id);
    const material = this.items[materialIndex];
    this.items[materialIndex] = {
      ...material,
      ...(data as Material),
      updatedAt: new Date(),
    };
    const { user, discipline, ...updatedMaterial } = this.items[materialIndex];
    return updatedMaterial;
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
        (material) => material.disciplineId === disciplina,
      );
    }
    if (curso) {
      materials = materials.filter(
        (material) => material.discipline.course === curso,
      );
    }
    if (professor) {
      materials = materials.filter(
        (material) => material.discipline.professor === professor,
      );
    }
    if (ordem && ordemBy) {
      materials = materials.sort((a, b) => {
        if (ordem === 'asc') {
          return a[
            ordemBy as keyof (Material & { user: User; discipline: Discipline })
          ] >
            b[
              ordemBy as keyof (Material & {
                user: User;
                discipline: Discipline;
              })
            ]
            ? 1
            : -1;
        }
        return a[
          ordemBy as keyof (Material & { user: User; discipline: Discipline })
        ] <
          b[
            ordemBy as keyof (Material & { user: User; discipline: Discipline })
          ]
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
        (material) => material.disciplineId === disciplina,
      );
    }
    if (curso) {
      materials = materials.filter(
        (material) => material.discipline.course === curso,
      );
    }
    if (professor) {
      materials = materials.filter(
        (material) => material.discipline.professor === professor,
      );
    }
    if (ordem && ordemBy) {
      materials = materials.sort((a, b) => {
        if (ordem === 'asc') {
          return a[
            ordemBy as keyof (Material & { user: User; discipline: Discipline })
          ] >
            b[
              ordemBy as keyof (Material & {
                user: User;
                discipline: Discipline;
              })
            ]
            ? 1
            : -1;
        }
        return a[
          ordemBy as keyof (Material & { user: User; discipline: Discipline })
        ] <
          b[
            ordemBy as keyof (Material & { user: User; discipline: Discipline })
          ]
          ? 1
          : -1;
      });
    }
    materials = materials.filter((material) => material.user.id === userId);
    return materials;
  }
}
