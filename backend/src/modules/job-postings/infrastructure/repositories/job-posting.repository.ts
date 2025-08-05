import { BaseRepository } from "src/shared/infrastructure/repositories/base.repository";
import { JobPosting } from "../../domain/entities/job-posting.entity";
import { JobPostingOrmEntity } from "../entities/job-posting-orm.entity";
import { IJobPostingRepository } from "../../domain/interfaces/job-posting-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { JobPostingFactory } from "../../application/factories/job-posting.factory";

@Injectable()
export class JobPostingRepository extends BaseRepository<JobPosting, JobPostingOrmEntity> implements IJobPostingRepository {
    private readonly jobPostingFactory = new JobPostingFactory();

    constructor(
        @InjectRepository(JobPostingOrmEntity)
        repository: Repository<JobPostingOrmEntity>,
    ) {
        super(repository);
    }
    
    protected getFactory() {
        return this.jobPostingFactory;
    }
}