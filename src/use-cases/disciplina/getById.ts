import { NotFoundError } from '@errors/not-found-error';
import { Discipline, Review } from '@prisma/client';
import { IDisciplineRepository } from '@repositories/interface/discipline-repository';

interface GetByIdDisciplineUseCaseResponse {
  discipline: Discipline;
}
export class GetByIdDisciplineUseCase {
  constructor(private disciplineRepository: IDisciplineRepository) {}

  async execute(id: string): Promise<GetByIdDisciplineUseCaseResponse> {
    try {
      const disciplineData = await this.disciplineRepository.findById(id);
      if (!disciplineData) {
        throw new NotFoundError('Disciplina não encontrada');
      }
      const ratingDistribution = this.calculateRatingDistribution(
        disciplineData.reviews,
      );
      const semesterData = this.calculateSemesterData(disciplineData.reviews);
      const discipline = {
        ...disciplineData,
        ratingDistribution,
        semesterData,
      };
      return { discipline };
    } catch (error) {
      throw error;
    }
  }
  private calculateRatingDistribution(
    reviews: Review[],
  ): { stars: string; percentage: number; color: string }[] {
    const ratingCounts = {
      '0-2': 0,
      '2-4': 0,
      '4-6': 0,
      '6-8': 0,
      '8-10': 0,
    };

    reviews.forEach((review) => {
      const score = review.disciplineScore;

      if (score >= 0 && score < 2) ratingCounts['0-2']++;
      else if (score >= 2 && score < 4) ratingCounts['2-4']++;
      else if (score >= 4 && score < 6) ratingCounts['4-6']++;
      else if (score >= 6 && score < 8) ratingCounts['6-8']++;
      else if (score >= 8 && score <= 10) ratingCounts['8-10']++;
    });

    const totalReviews = reviews.length;

    const distribution = Object.keys(ratingCounts).map((range) => {
      const count = ratingCounts[
        range as unknown as keyof typeof ratingCounts
      ] as number;
      const percentage = (count / totalReviews) * 100;

      const color = this.getColorForRange(range);

      return { stars: range, percentage, color };
    });

    return distribution;
  }

  private getColorForRange(range: string): string {
    switch (range) {
      case '0-2':
        return 'darkred';
      case '2-4':
        return 'red';
      case '4-6':
        return 'orange';
      case '6-8':
        return 'yellow';
      case '8-10':
        return 'green';
      default:
        return 'gray';
    }
  }

  private calculateSemesterData(
    reviews: Review[],
  ): { semester: string; rating: number }[] {
    const semesterRatings: Record<string, number[]> = {};

    reviews.forEach((review) => {
      const semester = review.periodPaid;
      if (!semesterRatings[semester]) semesterRatings[semester] = [];
      semesterRatings[semester].push(review.disciplineScore);
    });

    const semesterData = Object.keys(semesterRatings).map((semester) => {
      const ratings = semesterRatings[semester];
      const averageRating =
        ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
      return { semester, rating: parseFloat(averageRating.toFixed(2)) };
    });

    return semesterData;
  }
}
