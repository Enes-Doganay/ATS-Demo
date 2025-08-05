import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../shared/infrastructure/repositories/base.repository";
import { Candidate } from "../../domain/entities/candidate.entity";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";
import { CandidateFactory } from "../../application/factories/candidate.factory";
import { CandidateOrmEntity } from "../entities/candidate-orm.entity";

@Injectable()
export class CandidateRepository extends BaseRepository<Candidate, CandidateOrmEntity> implements ICandidateRepository {
    private readonly candidateFactory = new CandidateFactory();
    
    constructor(
        @InjectRepository(CandidateOrmEntity)
        repository: Repository<CandidateOrmEntity>,
    ) {
        super(repository);
    }

    protected getFactory() {
        return this.candidateFactory;
    }
}