import { Injectable, Inject } from "@nestjs/common";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";
import { CreateCandidateDto } from "../dto/create-candidate.dto";
import { CandidateFactory } from "../../domain/factories/candidate.factory";

@Injectable()
export class CreateCandidateUseCase {
    constructor(@Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository) {}

    async execute(dto: CreateCandidateDto) {
        const candidate = CandidateFactory.createFromDto(dto);
        return await this.candidateRepository.create(candidate);
    }
}