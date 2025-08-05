import { Inject } from "@nestjs/common";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";
import { UserFactory } from "../factories/user.factory";
import { User } from "../../domain/entities/user.entity";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";

export class UpdateUserUseCase {
    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
        @Inject('IUserFactory') private readonly userFactory: UserFactory,
    ) {}

  async execute(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
        throw new EntityNotFoundError('User', id);
    }

    const updatedUser = this.userFactory.updateFromDto(user, dto);
    return this.userRepository.update(updatedUser);
  }
}