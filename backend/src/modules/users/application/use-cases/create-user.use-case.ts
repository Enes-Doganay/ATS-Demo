import { Inject } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";
import { User } from "../../domain/entities/user.entity";
import { IUserFactory } from "../../domain/interfaces/user-factory.interface";

export class CreateUserUseCase {
    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
        @Inject('IUserFactory') private readonly userFactory: IUserFactory,
    ) {}

    async execute(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userFactory.createFromDto(createUserDto);
        return await this.userRepository.create(user);
    }
}