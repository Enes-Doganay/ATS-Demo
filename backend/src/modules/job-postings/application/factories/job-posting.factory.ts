import { BaseFactory } from "src/shared/domain/factories/base.factory";
import { JobPosting } from "../../domain/entities/job-posting.entity";
import { JobPostingOrmEntity } from "../../infrastructure/entities/job-posting-orm.entity";
import { CreateJobPostingDto } from "../dto/create-job-posting.dto";
import { UpdateJobPostingDto } from "../dto/update-job-posting.dto";
import { JobPostingDto } from "../dto/job-posting.dto";

export class JobPostingFactory extends BaseFactory<JobPosting, JobPostingOrmEntity, CreateJobPostingDto, UpdateJobPostingDto, JobPostingDto> {
    createFromDto(dto: CreateJobPostingDto): JobPosting {
        return new JobPosting(
            0,
            dto.title,
            dto.description,
            dto.location,
            dto.postedBy,
            this.getCurrentTimeStamp(),
            this.getCurrentTimeStamp(),
        );
    }

    fromEntity(entity: JobPostingOrmEntity): JobPosting {
        return new JobPosting(
            entity.id,
            entity.title,
            entity.description,
            entity.location,
            entity.postedBy,
            entity.createdAt,
            entity.updatedAt,
        );
    }

    toEntity(domain: JobPosting): JobPostingOrmEntity {
        const entity = new JobPostingOrmEntity();

        entity.id = domain.id;
        entity.title = domain.title;
        entity.description = domain.description;
        entity.location = domain.location;
        entity.postedBy = domain.postedBy;
        entity.createdAt = domain.createdAt;
        entity.updatedAt = domain.updatedAt;

        return entity;
    }

    updateFromDto(existing: JobPosting, dto: UpdateJobPostingDto): JobPosting {
        return new JobPosting(
            existing.id,
            dto.title ?? existing.title,
            dto.description ?? existing.description,
            dto.location ?? existing.location,
            dto.postedBy ?? existing.postedBy,
            existing.createdAt,
            this.getCurrentTimeStamp(),
        );
    }

    toDto(domain: JobPosting): JobPostingDto {
        return {
            id: domain.id,
            title: domain.title,
            description: domain.description,
            location: domain.location,
            postedBy: domain.postedBy,
        };
    }

}