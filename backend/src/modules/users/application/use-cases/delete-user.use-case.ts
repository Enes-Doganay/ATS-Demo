import { Inject } from "@nestjs/common";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";

export class DeleteUserUseCase {
    constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

    async execute(id: number): Promise<void> {
        const user = await this.repository.findById(id);

        if (!user) {
            throw new EntityNotFoundError('User', id);
        }

        await this.repository.delete(id);
    }
}