import { Inject } from "@nestjs/common";
import { CreateJobPostingDto } from "../dto/create-job-posting.dto";
import { JobPosting } from "../../domain/entities/job-posting.entity";
import { IUserRepository } from "src/modules/users/domain/interfaces/user-repository.interface";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";
import { IJobPostingRepository } from "../../domain/interfaces/job-posting-repository.interface";
import { IJobPostingFactory } from "../../domain/interfaces/job-posting-factory.interface";

export class CreateJobPostingUseCase {
    constructor(
        @Inject('IJobPostingRepository') private readonly jobPostingRepository: IJobPostingRepository,
        @Inject('IJobPostingFactory') private readonly jobPostingFactory: IJobPostingFactory,
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    ) {}

    async execute(dto: CreateJobPostingDto): Promise<JobPosting> {
        const user = await this.userRepository.findById(dto.postedBy);

        if (!user) {
            throw new EntityNotFoundError('User', dto.postedBy);
        }

        const jobPosting = await this.jobPostingFactory.createFromDto(dto);
        return await this.jobPostingRepository.create(jobPosting);
    }
}