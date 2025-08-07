import { Inject } from "@nestjs/common";
import { IApplicationRepository } from "../../domain/interfaces/application-repository.interface";
import { IApplicationFactory } from "../../domain/interfaces/application-factory.interface";
import { ICandidateRepository } from "src/modules/candidates/domain/interfaces/candidate-repository.interface";
import { IJobPostingRepository } from "src/modules/job-postings/domain/interfaces/job-posting-repository.interface";
import { Application } from "../../domain/entities/application.entity";
import { CreateApplicationDto } from "../dto/create-application.dto";
import { EntityNotFoundError } from "src/shared/domain/errors/entity-not-found.error";

export class CreateApplicationUseCase {
    constructor(
        @Inject('IApplicationRepository') private readonly applicationRepository: IApplicationRepository,
        @Inject('IApplicationFactory') private readonly applicationFactory: IApplicationFactory,
        @Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository,
        @Inject('IJobPostingRepository') private readonly jobPostingRepository: IJobPostingRepository,
    ) {}

    async execute(dto: CreateApplicationDto): Promise<Application> {
        const candidate = await this.candidateRepository.findById(dto.candidate_id);

        if (!candidate) {
            throw new EntityNotFoundError('Candidate', dto.candidate_id);
        }

        const jobPosting = await this.jobPostingRepository.findById(dto.job_posting_id);

        if (!jobPosting) {
            throw new EntityNotFoundError('Job Posting', dto.job_posting_id);
        }

        const application = await this.applicationFactory.createFromDto(dto);
        return await this.applicationRepository.create(application);
    }
}