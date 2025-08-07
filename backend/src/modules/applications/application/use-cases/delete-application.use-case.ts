import { Inject } from "@nestjs/common";
import { IApplicationRepository } from "../../domain/interfaces/application-repository.interface";
import { IApplicationFactory } from "../../domain/interfaces/application-factory.interface";
import { EntityNotFoundError } from "src/shared/domain/errors/entity-not-found.error";

export class DeleteApplicationUseCase {
    constructor(
        @Inject('IApplicationRepository') private readonly applicationRepository: IApplicationRepository,
    ) {}

    async execute(applicationId: number): Promise<void> {
        const application = await this.applicationRepository.findById(applicationId);

        if (!application) {
            throw new EntityNotFoundError('Application', applicationId);
        }

        await this.applicationRepository.delete(applicationId);
    }
}