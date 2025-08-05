import { Inject } from "@nestjs/common";
import { JobPosting } from "../../domain/entities/job-posting.entity";
import { IJobPostingRepository } from "../../domain/interfaces/job-posting-repository.interface";

export class FindAllJobPostingUseCase {
    constructor(
        @Inject('IJobPostingRepository') private readonly jobPostingRepository: IJobPostingRepository,
    ) {}

    async execute(): Promise<JobPosting[]> {
        return await this.jobPostingRepository.findAll();
    }
}