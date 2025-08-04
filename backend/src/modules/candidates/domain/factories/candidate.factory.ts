import { CandidateDto } from "../../application/dto/candidate.dto";
import { CreateCandidateDto } from "../../application/dto/create-candidate.dto";
import { UpdateCandidateDto } from "../../application/dto/update-candidate.dto";
import { CandidateOrmEntity } from "../../infrastructure/entities/candidate-orm.entity";
import { Candidate } from "../entities/candidate.entity";

export class CandidateFactory {
    static createFromDto(dto: CreateCandidateDto): Candidate {
        return new Candidate(
            0,
            dto.user_id,
            dto.first_name,
            dto.last_name,
            dto.email,
            dto.phone || '',
            dto.resume_url || '',
            new Date(),
            new Date(),
        )
    }

    static fromEntity(entity: CandidateOrmEntity): Candidate {
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

    static updateFromDto(existing: Candidate, dto: UpdateCandidateDto): Candidate {
        return new Candidate(
            existing.id,
            dto.user_id || existing.userId,
            dto.first_name || existing.firstName,
            dto.last_name || existing.lastName,
            dto.email || existing.email,
            dto.phone || existing.phone,
            dto.resume_url || existing.resumeUrl,
            existing.createdAt,
            new Date(),
        );
    }

    static toCandidateDto(candidate: Candidate): CandidateDto {
        return{
            id: candidate.id,
            user_id: candidate.userId,
            first_name: candidate.firstName,
            last_name: candidate.lastName,
            email: candidate.email,
            phone: candidate.phone,
            resume_url: candidate.resumeUrl,
        };
    }

}