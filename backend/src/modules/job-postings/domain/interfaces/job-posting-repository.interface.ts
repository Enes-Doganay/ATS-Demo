import { IBaseRepository } from "src/shared/domain/interfaces/base-repository.interface";
import { JobPosting } from "../entities/job-posting.entity";

export interface IJobPostingRepository extends IBaseRepository<JobPosting> {
}