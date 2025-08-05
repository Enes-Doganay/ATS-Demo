import { Inject } from "@nestjs/common";
import { JobPostingRepository } from "../../infrastructure/repositories/job-posting.repository";
import { JobPostingFactory } from "../../domain/factories/job-posting.factory";
import { JobPosting } from "../../domain/entities/job-posting.entity";

export class FindAllJobPostingUseCase {
    constructor(
        @Inject('IJobPostingRepository') private readonly jobPostingRepository: JobPostingRepository,
    ) {}

    async execute(): Promise<JobPosting[]> {
        return await this.jobPostingRepository.findAll();
    }
}