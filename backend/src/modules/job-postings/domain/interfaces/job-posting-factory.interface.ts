import { IBaseFactory } from "src/shared/domain/interfaces/base-factory.interface";
import { JobPosting } from "../entities/job-posting.entity";
import { JobPostingOrmEntity } from "../../infrastructure/entities/job-posting-orm.entity";
import { CreateJobPostingDto } from "../../application/dto/create-job-posting.dto";
import { UpdateJobPostingDto } from "../../application/dto/update-job-posting.dto";
import { JobPostingDto } from "../../application/dto/job-posting.dto";

export interface IJobPostingFactory extends IBaseFactory<JobPosting, JobPostingOrmEntity, CreateJobPostingDto, UpdateJobPostingDto, JobPostingDto> {
} 