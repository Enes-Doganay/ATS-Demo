import { Inject } from "@nestjs/common";
import { EntityNotFoundError } from "src/shared/domain/errors/entity-not-found.error";
import { IJobPostingRepository } from "../../domain/interfaces/job-posting-repository.interface";

export class DeleteJobPostingUseCase {
  constructor(
    @Inject('IJobPostingRepository') private readonly jobPostingRepository: IJobPostingRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const jobPosting = await this.jobPostingRepository.findById(id);

    if (!jobPosting) {
      throw new EntityNotFoundError('JobPosting', id);
    }

    await this.jobPostingRepository.delete(id);
  }
}