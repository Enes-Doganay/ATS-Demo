import { BaseFactory } from "src/shared/domain/factories/base.factory";
import { CandidateDto } from "../../application/dto/candidate.dto";
import { CreateCandidateDto } from "../../application/dto/create-candidate.dto";
import { UpdateCandidateDto } from "../../application/dto/update-candidate.dto";
import { CandidateOrmEntity } from "../../infrastructure/entities/candidate-orm.entity";
import { Candidate } from "../entities/candidate.entity";

export class CandidateFactory extends BaseFactory<Candidate, CandidateOrmEntity, CreateCandidateDto, UpdateCandidateDto, CandidateDto> {
    createFromDto(dto: CreateCandidateDto): Candidate {
        return new Candidate(
            0,
            dto.user_id,
            dto.first_name,
            dto.last_name,
            dto.email,
            dto.phone || '',
            dto.resume_url || '',
            this.getCurrentTimeStamp(),
            this.getCurrentTimeStamp(),
        );
    }

    fromEntity(entity: CandidateOrmEntity): Candidate {
        return new Candidate(
            entity.id,
            entity.userId,
            entity.firstName,
            entity.lastName,
            entity.email,
            entity.phone || '',
            entity.resumeUrl || '',
            entity.createdAt,
            entity.updatedAt,
        );
    }

    toEntity(domain: Candidate): CandidateOrmEntity {
        const entity = new CandidateOrmEntity();

        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.firstName = domain.firstName;
        entity.lastName = domain.lastName;
        entity.email = domain.email;
        entity.phone = domain.phone;
        entity.resumeUrl = domain.resumeUrl;
        entity.createdAt = domain.createdAt;
        entity.updatedAt = domain.updatedAt;

        return entity;
    }

    updateFromDto(existing: Candidate, dto: UpdateCandidateDto): Candidate {
        return new Candidate(
            existing.id,
            dto.user_id || existing.userId,
            dto.first_name || existing.firstName,
            dto.last_name || existing.lastName,
            dto.email || existing.email,
            dto.phone || existing.phone,
            dto.resume_url || existing.resumeUrl,
            existing.createdAt,
            this.getCurrentTimeStamp(),
        );
    }

    toDto(domain: Candidate): CandidateDto {
        return {
            id: domain.id,
            user_id: domain.userId,
            first_name: domain.firstName,
            last_name: domain.lastName,
            email: domain.email,
            phone: domain.phone,
            resume_url: domain.resumeUrl,
        };
    }
}