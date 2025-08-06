import { Inject } from "@nestjs/common";
import { IApplicationRepository } from "../../domain/interfaces/application-repository.interface";
import { Application } from "../../domain/entities/application.entity";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";

export class FindApplicationByIdUseCase {
    constructor(
        @Inject('IApplicationRepository') private readonly applicationRepository: IApplicationRepository,
    ) {}

    async execute(applicationId: number): Promise<Application> {
        const application = await this.applicationRepository.findById(applicationId);

        if (!application) {
            throw new EntityNotFoundError('Application', applicationId);
        }

        return application;
    }
}