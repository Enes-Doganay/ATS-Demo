import { Injectable, Inject } from "@nestjs/common";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";

@Injectable()
export class FindAllCandidatesUseCase {
    constructor(@Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository) {}

    async execute() {
        return await this.candidateRepository.findAll();
    }
}