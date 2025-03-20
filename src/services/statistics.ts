import { IReviewRepository } from "@repositories/interface/review-repository";
import { IStatisticRepository } from "@repositories/interface/statistic-repository";

export class StatisticService{
    constructor( private reviewRepository:IReviewRepository,
        private statisticsRepository:IStatisticRepository
    ){}
    async updateStatistics(disciplineId:string){
        
    }
}