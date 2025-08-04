import { IBaseRepository } from "../../../../shared/domain/interfaces/base-repository.interface";
import { Candidate } from "../entities/candidate.entity";

export interface ICandidateRepository extends IBaseRepository<Candidate> {
}