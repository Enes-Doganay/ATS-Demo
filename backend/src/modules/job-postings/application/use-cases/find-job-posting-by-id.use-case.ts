import { Inject } from "@nestjs/common";
import { JobPostingRepository } from "../../infrastructure/repositories/job-posting.repository";
import { JobPostingFactory } from "../../domain/factories/job-posting.factory";
import { JobPosting } from "../../domain/entities/job-posting.entity";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";

export class FindJobPostingByIdUseCase {
  constructor(
    @Inject('IJobPostingRepository') private readonly jobPostingRepository: JobPostingRepository,
  ) {}

  async execute(id: number): Promise<JobPosting> {
    const jobPosting = await this.jobPostingRepository.findById(id);

    if (!jobPosting) {
      throw new EntityNotFoundError('JobPosting', id);
    }

    return jobPosting;
  }
}