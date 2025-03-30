import { NotFoundError } from '@errors/not-found-error';
import { Review, Prisma } from '@prisma/client';
import { IReviewRepository } from '@repositories/interface/review-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryReviewRepository implements IReviewRepository {
  public items: Review[] = [];

  async create(data: Prisma.ReviewUncheckedCreateInput) {
    const newReview: Review = {
      id: randomUUID(),
      comment: data.comment|| '',
      userId: data.userId || randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      disciplineId: data.disciplineId || randomUUID(),
      difficultyLevel: data.difficultyLevel,
      disciplineScore: data.disciplineScore,
      droppedOut: data.droppedOut,
      finalGrade: data.finalGrade,
      passedFirstTry: data.passedFirstTry,
      periodPaid: data.periodPaid,
      professorTeachingScore: data.professorTeachingScore,
      recommendation: data.recommendation|| '',
    };
    this.items.push(newReview);
    return newReview;
  }

  async findById(id: string) {
    const Review = this.items.find((Review) => Review.id === id);
    if (!Review) {
      throw new NotFoundError('Review not found');
    }
    return Review;
  }

  async delete(id: string) {
    const index = await this.items.findIndex((Review) => Review.id === id);
    if (index === -1) {
      throw new NotFoundError('Review not found');
    }
    this.items.splice(index, 1);
    return this.items[index];
  }

  async update(id: string, data: Prisma.ReviewUncheckedUpdateInput) {
    const index = this.items.findIndex((Review) => Review.id === id);
    if (index == -1) {
      throw new NotFoundError('Review not found');
    }
    this.items[index] = {
      ...this.items[index],
      ...(data as Review),
      updatedAt: new Date(),
    };
    const Review = this.items[index];

    return Review;
  }

  async findAll() {
    return this.items;
  }
  async findByDisciplineId(disciplineId: string) {
    const reviews = this.items.filter(
      (review) => review.disciplineId === disciplineId,
    );
    return reviews;
  }
  async findByFiltres(data: Prisma.ReviewWhereInput) {
    const { userId, disciplineId } = data;
    const reviews = this.items.filter((review) => {
      return (
        (userId ? review.userId === userId : true) &&
        (disciplineId ? review.disciplineId === disciplineId : true)
      );
    });
    return reviews;
  }
}
