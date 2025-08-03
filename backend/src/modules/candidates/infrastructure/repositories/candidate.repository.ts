import { InjectRepository } from "@nestjs/typeorm";
import { Candidate } from "../../domain/entities/candidate.entity";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";
import { CandidateOrmEntity } from "../entities/candidate-orm.entity";
import { Repository } from "typeorm";
import { CandidateFactory } from "../../domain/factories/candidate.factory";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CandidateRepository implements ICandidateRepository {
    constructor(
        @InjectRepository(CandidateOrmEntity)
        private readonly repository: Repository<CandidateOrmEntity>,
    ){}

    async findById(id: number): Promise<Candidate | null> {
        const entity = await this.repository.findOne( { where: { id }});

        if (!entity) return null;

        return CandidateFactory.fromEntity(entity);
    }

    async findAll(): Promise<Candidate[]> {
        const candidates = await this.repository.find();
        return candidates.map(entity => CandidateFactory.fromEntity(entity));
    }
    async create(candidate: Candidate): Promise<Candidate> {
        const entity = this.repository.create(candidate);
        const savedEntity = await this.repository.save(entity);
        return CandidateFactory.fromEntity(savedEntity);
    }
    async update(candidate: Candidate): Promise<Candidate> {
        await this.repository.update(candidate.id, candidate);
        return candidate;
    }
    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}