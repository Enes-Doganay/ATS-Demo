import { Inject } from "@nestjs/common";
import { JobPostingRepository } from "../../infrastructure/repositories/job-posting.repository";
import { JobPostingFactory } from "../../domain/factories/job-posting.factory";
import { UpdateJobPostingDto } from "../dto/update-job-posting.dto";
import { JobPosting } from "../../domain/entities/job-posting.entity";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";
import { IUserRepository } from "src/modules/users/domain/interfaces/user-repository.interface";

export class UpdateJobPostingUseCase {
    constructor(
        @Inject('IJobPostingRepository') private readonly jobPostingRepository: JobPostingRepository,
        @Inject('IJobPostingFactory') private readonly jobPostingFactory: JobPostingFactory,
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    ){}

    async execute(id: number, dto: UpdateJobPostingDto): Promise<JobPosting> {
        const jobPosting = await this.jobPostingRepository.findById(id);

        if (!jobPosting) {
            throw new EntityNotFoundError('JobPosting', id);
        }

        if (dto.postedBy && dto.postedBy !== jobPosting.postedBy) {
            const user = await this.userRepository.findById(dto.postedBy);

            if (!user) {
                throw new EntityNotFoundError('User', dto.postedBy);
            }
        }

        const updatedJobPosting = this.jobPostingFactory.updateFromDto(jobPosting, dto);
        return await this.jobPostingRepository.update(updatedJobPosting);
    }
}