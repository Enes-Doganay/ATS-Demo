import { Injectable, Inject } from "@nestjs/common";
import { Candidate } from "../../domain/entities/candidate.entity";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";
import { UpdateCandidateDto } from "../dto/update-candidate.dto";
import { CandidateFactory } from "../factories/candidate.factory";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";
import { IUserRepository } from "src/modules/users/domain/interfaces/user-repository.interface";

@Injectable()
export class UpdateCandidateUseCase {
    constructor(
        @Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository,
        @Inject('ICandidateFactory') private readonly candidateFactory: CandidateFactory,
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    ) {}

    async execute(id: number, dto: UpdateCandidateDto): Promise<Candidate> {
        const existingCandidate = await this.candidateRepository.findById(id);

        if (!existingCandidate) {
            throw new EntityNotFoundError('Candidate', id);
        }

        if (dto.user_id && dto.user_id !== existingCandidate.userId) {
            const user = await this.userRepository.findById(dto.user_id);
            if (!user) {
                throw new EntityNotFoundError('User', dto.user_id);
            }
        }

        const updatedCandidate = this.candidateFactory.updateFromDto(existingCandidate, dto);
        return await this.candidateRepository.update(updatedCandidate);
    }
}