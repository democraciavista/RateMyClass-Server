import { IReviewRepository } from '@repositories/interface/review-repository';
import { IStatisticRepository } from '@repositories/interface/statistic-repository';

export class StatisticService {
  constructor(
    private reviewRepository: IReviewRepository,
    private statisticsRepository: IStatisticRepository,
  ) {}
  async updateStatistics(disciplineId: string) {
    try {
      const reviews = await this.reviewRepository.findByFiltres({
        disciplineId,
      });

      if (reviews.length === 0) {
        const data = {
          disciplineId,
          totalReviews: 0,
          averageGrades: 0,
          averageTeachingScore: 0,
          averageDifficulty: 0,
          dropoutRate: 0,
          disciplineScore: 0,
          approvalRate: 0,
        };
        await this.statisticsRepository.upsert(disciplineId, data);
      }

      const totalReviews = reviews.length;
      const averageGrades =
        reviews.reduce((sum, review) => sum + review.finalGrade, 0) /
        totalReviews;
      const averageTeachingScore =
        reviews.reduce(
          (sum, review) => sum + review.professorTeachingScore,
          0,
        ) / totalReviews;
      const averageDifficulty =
        reviews.reduce((sum, review) => sum + review.difficultyLevel, 0) /
        totalReviews;

      const dropoutsCount = reviews.filter(
        (review) => review.droppedOut,
      ).length;
      const dropoutRate = (dropoutsCount / totalReviews) * 100;

      const disciplineScore =
        reviews.reduce((sum, review) => sum + review.disciplineScore, 0) /
        totalReviews;

      const passedFirstTryCount = reviews.filter(
        (review) => review.passedFirstTry,
      ).length;
      const approvalRate = (passedFirstTryCount / totalReviews) * 100;

      const data = {
        totalReviews,
        averageGrades,
        averageTeachingScore,
        averageDifficulty,
        dropoutRate,
        disciplineScore,
        approvalRate,
        disciplineId,
      };

      await this.statisticsRepository.upsert(disciplineId, data);
    } catch (error) {
      console.error('Erro ao atualizar estatísticas:', error);
      throw error;
    }
  }
}
