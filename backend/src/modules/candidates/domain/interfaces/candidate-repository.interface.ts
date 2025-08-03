import { Candidate } from "../entities/candidate.entity";

export interface ICandidateRepository {
    findById(id: number): Promise<Candidate | null>;
    findAll(): Promise<Candidate[]>;
    create(candidate: Candidate): Promise<Candidate>;
    update(candidate: Candidate): Promise<Candidate>;
    delete(id: number): Promise<void>;
}