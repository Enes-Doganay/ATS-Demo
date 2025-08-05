import { Injectable, Inject } from "@nestjs/common";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";
import { CreateCandidateDto } from "../dto/create-candidate.dto";
import { CandidateFactory } from "../factories/candidate.factory";
import { Candidate } from "../../domain/entities/candidate.entity";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error"; // Bu satırı değiştir
import { IUserRepository } from "src/modules/users/domain/interfaces/user-repository.interface";

@Injectable()
export class CreateCandidateUseCase {
    constructor(
        @Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository,
        @Inject('ICandidateFactory') private readonly candidateFactory: CandidateFactory,
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    ) {}

    async execute(dto: CreateCandidateDto): Promise<Candidate> {
        const user = await this.userRepository.findById(dto.user_id);
        if (!user) {
            throw new EntityNotFoundError('User', dto.user_id);
        }

        const candidate = this.candidateFactory.createFromDto(dto);
        return await this.candidateRepository.create(candidate);
    }
}