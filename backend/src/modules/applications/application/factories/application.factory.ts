import { BaseFactory } from "src/shared/domain/factories/base.factory";
import { ApplicationOrmEntity } from "../../infrastructure/entities/application-orm.entity";
import { CreateApplicationDto } from "../dto/create-application.dto";
import { UpdateApplicationDto } from "../dto/update-application.dto";
import { ApplicationDto } from "../dto/application.dto";
import { Application } from "../../domain/entities/application.entity";

export class ApplicationFactory extends BaseFactory<Application, ApplicationOrmEntity, CreateApplicationDto, UpdateApplicationDto, ApplicationDto>{
    createFromDto(dto: CreateApplicationDto): Application{
        return new Application(
            0,
            dto.candidate_id,
            dto.job_posting_id,
            new Date(dto.applied_at),
            dto.status,
            this.getCurrentTimeStamp(),
            this.getCurrentTimeStamp()
        );
    }

    fromEntity(entity: ApplicationOrmEntity): Application {
        return new Application(
            entity.id,
            entity.candidateId,
            entity.jobPostingId,
            entity.appliedAt,
            entity.status,
            entity.createdAt,
            entity.updatedAt
        )
    }

    toEntity(domain: Application): ApplicationOrmEntity {
        const entity = new ApplicationOrmEntity();

        entity.id = domain.id;
        entity.candidateId = domain.candidateId;
        entity.jobPostingId = domain.jobPostingId;
        entity.appliedAt = domain.appliedAt;
        entity.status = domain.status;
        entity.createdAt = domain.createdAt;
        entity.updatedAt = domain.updatedAt;

        return entity;
    }

    updateFromDto(existing: Application, dto: UpdateApplicationDto): Application {
        return new Application(
            existing.id,
            dto.candidate_id || existing.candidateId,
            dto.job_posting_id || existing.jobPostingId,
            dto.applied_at ? new Date(dto.applied_at) : existing.appliedAt,
            dto.status || existing.status,
            existing.createdAt,
            this.getCurrentTimeStamp()
        );
    }

    toDto(domain: Application): ApplicationDto {
        return {
            id: domain.id,
            candidate_id: domain.candidateId,
            job_posting_id: domain.jobPostingId,
            applied_at: domain.appliedAt.toISOString(),
            status: domain.status,
        };
    }

}