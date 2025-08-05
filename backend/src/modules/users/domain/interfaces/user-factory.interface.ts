import { IBaseFactory } from "src/shared/domain/interfaces/base-factory.interface";
import { User } from "../entities/user.entity";
import { UserOrmEntity } from "../../infrastructure/entities/user-orm-entity";
import { CreateUserDto } from "../../application/dtos/create-user.dto";
import { UpdateUserDto } from "../../application/dtos/update-user.dto";
import { UserDto } from "../../application/dtos/user.dto";

export interface IUserFactory extends IBaseFactory<User, UserOrmEntity, CreateUserDto, UpdateUserDto, UserDto> {
}