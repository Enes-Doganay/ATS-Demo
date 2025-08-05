import { BaseFactory } from "src/shared/domain/factories/base.factory";
import { User } from "../../domain/entities/user.entity";
import { UserOrmEntity } from "../../infrastructure/entities/user-orm-entity";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserDto } from "../dtos/user.dto";

export class UserFactory extends BaseFactory<User, UserOrmEntity, CreateUserDto, UpdateUserDto, UserDto> {
    createFromDto(dto: CreateUserDto): User {
        return new User(
            0,
            dto.name,
            dto.email,
            dto.password,
            dto.role,
            this.getCurrentTimeStamp(),
            this.getCurrentTimeStamp(),
        );
    }

    fromEntity(entity: UserOrmEntity): User {
        return new User(
            entity.id,
            entity.name,
            entity.email,
            entity.password,
            entity.role,
            entity.createdAt,
            entity.updatedAt,
        );
    }

    toEntity(domain: User): UserOrmEntity {
        const entity = new UserOrmEntity();

        entity.id = domain.id;
        entity.name = domain.name;
        entity.email = domain.email;
        entity.password = domain.password;
        entity.role = domain.role;
        entity.createdAt = domain.createdAt;
        entity.updatedAt = domain.updatedAt;

        return entity;
    }

    updateFromDto(existing: User, dto: UpdateUserDto): User {
        return new User(
            existing.id,
            dto.name || existing.name,
            dto.email || existing.email,
            dto.password || existing.password,
            dto.role || existing.role,
            existing.createdAt,
            this.getCurrentTimeStamp(),
        )
    }
    toDto(domain: User): UserDto {
        return {
            id: domain.id,
            name: domain.name,
            email: domain.email,
            password: domain.password,
            role: domain.role,
        };
    }

}