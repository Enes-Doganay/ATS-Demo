import { IBaseFactory } from "src/shared/domain/interfaces/base-factory.interface";
import { Candidate } from "../entities/candidate.entity";
import { CandidateOrmEntity } from "../../infrastructure/entities/candidate-orm.entity";
import { CreateCandidateDto } from "../../application/dto/create-candidate.dto";
import { UpdateCandidateDto } from "../../application/dto/update-candidate.dto";
import { CandidateDto } from "../../application/dto/candidate.dto";

export interface ICandidateFactory extends IBaseFactory<Candidate, CandidateOrmEntity, CreateCandidateDto, UpdateCandidateDto, CandidateDto> {
}