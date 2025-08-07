import { Inject } from "@nestjs/common";
import { JobPosting } from "../../domain/entities/job-posting.entity";
import { EntityNotFoundError } from "src/shared/domain/errors/entity-not-found.error";
import { IJobPostingRepository } from "../../domain/interfaces/job-posting-repository.interface";

export class FindJobPostingByIdUseCase {
  constructor(
    @Inject('IJobPostingRepository') private readonly jobPostingRepository: IJobPostingRepository,
  ) {}

  async execute(id: number): Promise<JobPosting> {
    const jobPosting = await this.jobPostingRepository.findById(id);

    if (!jobPosting) {
      throw new EntityNotFoundError('JobPosting', id);
    }

    return jobPosting;
  }
}