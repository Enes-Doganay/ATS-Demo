import { Inject } from "@nestjs/common";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";
import { User } from "../../domain/entities/user.entity";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { EntityNotFoundError } from "src/shared/application/errors/entity-not-found.error";
import { IUserFactory } from "../../domain/interfaces/user-factory.interface";

export class UpdateUserUseCase {
    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
        @Inject('IUserFactory') private readonly userFactory: IUserFactory,
    ) {}

  async execute(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
        throw new EntityNotFoundError('User', id);
    }

    const updatedUser = await this.userFactory.updateFromDto(user, dto);
    return this.userRepository.update(updatedUser);
  }
}