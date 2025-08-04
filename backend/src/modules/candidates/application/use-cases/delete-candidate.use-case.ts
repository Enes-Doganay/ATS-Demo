import { Injectable, Inject } from "@nestjs/common";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";
import { CandidateNotFoundError } from "../errors/candidate-not-found.error";

@Injectable()
export class DeleteCandidateUseCase {
  constructor(@Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository) {}

  async execute(id: number) {
    const candidate = await this.candidateRepository.findById(id);

    if (!candidate) {
      throw new CandidateNotFoundError(id);
    }

    return await this.candidateRepository.delete(id);
  }
}