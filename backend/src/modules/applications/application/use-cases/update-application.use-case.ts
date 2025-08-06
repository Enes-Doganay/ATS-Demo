import { Inject } from "@nestjs/common";
import { IApplicationRepository } from "../../domain/interfaces/application-repository.interface";
import { IApplicationFactory } from "../../domain/interfaces/application-factory.interface";
import { UpdateApplicationDto } from "../dto/update-application.dto";
import { Application } from "../../domain/entities/application.entity";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";

export class UpdateApplicationUseCase {
    constructor(
        @Inject('IApplicationRepository') private readonly applicationRepository: IApplicationRepository,
        @Inject('IApplicationFactory') private readonly applicationFactory: IApplicationFactory,
    ) {}

    async execute(applicationId: number, dto: UpdateApplicationDto): Promise<Application> {
        const existingApplication = await this.applicationRepository.findById(applicationId);

        if (!existingApplication) {
            throw new EntityNotFoundError('Application', applicationId);
        }

        const updatedApplication = await this.applicationFactory.updateFromDto(existingApplication, dto);
        return await this.applicationRepository.update(updatedApplication);
    }
}