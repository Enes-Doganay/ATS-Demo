import { Injectable, Inject } from "@nestjs/common";
import { ICandidateRepository } from "../../domain/interfaces/candidate-repository.interface";

@Injectable()
export class FindCandidateByIdUseCase {
  constructor(@Inject('ICandidateRepository') private readonly candidateRepository: ICandidateRepository) {}

  async execute(id: number) {
    return await this.candidateRepository.findById(id);
  }
}