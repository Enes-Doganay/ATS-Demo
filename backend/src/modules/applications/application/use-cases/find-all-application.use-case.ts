import { Inject } from "@nestjs/common";
import { IApplicationRepository } from "../../domain/interfaces/application-repository.interface";
import { IApplicationFactory } from "../../domain/interfaces/application-factory.interface";
import { Application } from "../../domain/entities/application.entity";

export class FindAllApplicationUseCase {
    constructor(
        @Inject('IApplicationRepository') private readonly applicationRepository: IApplicationRepository,
    ) {}

    async execute(): Promise<Application[]> {
        return await this.applicationRepository.findAll();
    }
}