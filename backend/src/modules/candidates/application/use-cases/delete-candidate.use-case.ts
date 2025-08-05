import { Injectable, Inject } from "@nestjs/common";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";

@Injectable()
export class DeleteCandidateUseCase {
  constructor(@Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository) {}

  async execute(id: number): Promise<void> {
    const candidate = await this.candidateRepository.findById(id);

    if (!candidate) {
      throw new EntityNotFoundError('Candidate', id);
    }

    await this.candidateRepository.delete(id);
  }
}