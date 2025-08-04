import { Injectable, Inject } from "@nestjs/common";
import { Candidate } from "../../domain/entities/candidate.entity";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";
import { UpdateCandidateDto } from "../dto/update-candidate.dto";
import { CandidateFactory } from "../factories/candidate.factory";
import { CandidateNotFoundError } from "../errors/candidate-not-found.error";

@Injectable()
export class UpdateCandidateUseCase {
    constructor(
        @Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository,
        @Inject('ICandidateFactory') private readonly candidateFactory: CandidateFactory
    ) {}

    async execute(id: number, dto: UpdateCandidateDto): Promise<Candidate> {
        const existingCandidate = await this.candidateRepository.findById(id);

        if (!existingCandidate) {
            throw new CandidateNotFoundError(id);
        }

        const updatedCandidate = this.candidateFactory.updateFromDto(existingCandidate, dto);

        return await this.candidateRepository.update(updatedCandidate);
    }
}