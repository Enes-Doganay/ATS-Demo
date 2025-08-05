import { Inject } from "@nestjs/common";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";
import { User } from "../../domain/entities/user.entity";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";

export class FindUserByIdUseCase {
    constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

    async execute(id: number): Promise<User> {
        const user = await this.repository.findById(id);

        if (!user) {
            throw new EntityNotFoundError('User', id);
        }

        return user;
    }
}