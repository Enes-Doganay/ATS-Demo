import { Inject } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserFactory } from "../factories/user.factory";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";
import { User } from "../../domain/entities/user.entity";

export class CreateUserUseCase {
    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
        @Inject('IUserFactory') private readonly userFactory: UserFactory,
    ) {}

    async execute(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userFactory.createFromDto(createUserDto);
        return await this.userRepository.create(user);
    }
}