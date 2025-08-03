import { Injectable, Inject } from "@nestjs/common";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";

@Injectable()
export class DeleteCandidateUseCase {
  constructor(@Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository) {}

  async execute(id: number) {
    return await this.candidateRepository.delete(id);
  }
}