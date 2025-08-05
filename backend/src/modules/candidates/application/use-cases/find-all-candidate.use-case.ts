import { Injectable, Inject } from "@nestjs/common";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";
import { Candidate } from "../../domain/entities/candidate.entity";

@Injectable()
export class FindAllCandidatesUseCase {
    constructor(@Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository) {}

    async execute(): Promise<Candidate[]> {
        return await this.candidateRepository.findAll();
    }
}