import { Inject } from "@nestjs/common";
import { JobPostingRepository } from "../../infrastructure/repositories/job-posting.repository";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";

export class DeleteJobPostingUseCase {
  constructor(
    @Inject('IJobPostingRepository') private readonly jobPostingRepository: JobPostingRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const jobPosting = await this.jobPostingRepository.findById(id);

    if (!jobPosting) {
      throw new EntityNotFoundError('JobPosting', id);
    }

    await this.jobPostingRepository.delete(id);
  }
}