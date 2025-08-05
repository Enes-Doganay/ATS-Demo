import { Injectable, Inject } from "@nestjs/common";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";
import { Candidate } from "../../domain/entities/candidate.entity";

@Injectable()
export class FindCandidateByIdUseCase {
  constructor(@Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository) {}

  async execute(id: number): Promise<Candidate> {
    const candidate = await this.candidateRepository.findById(id);

    if (!candidate) {
      throw new EntityNotFoundError('Candidate', id);
    }

    return candidate;
  }
}