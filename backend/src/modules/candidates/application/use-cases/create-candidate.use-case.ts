import { Injectable, Inject } from "@nestjs/common";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";
import { ICandidateFactory } from "../../domain/interfaces/candidate-factory.interface";
import { CreateCandidateDto } from "../dto/create-candidate.dto";
import { Candidate } from "../../domain/entities/candidate.entity";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";
import { IUserRepository } from "src/modules/users/domain/interfaces/user-repository.interface";

@Injectable()
export class CreateCandidateUseCase {
    constructor(
        @Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository,
        @Inject('ICandidateFactory') private readonly candidateFactory: ICandidateFactory,
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    ) {}

    async execute(dto: CreateCandidateDto): Promise<Candidate> {
        const user = await this.userRepository.findById(dto.user_id);
        if (!user) {
            throw new EntityNotFoundError('User', dto.user_id);
        }

        const candidate = await this.candidateFactory.createFromDto(dto);
        return await this.candidateRepository.create(candidate);
    }
}