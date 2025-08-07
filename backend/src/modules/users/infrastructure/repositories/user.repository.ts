import { BaseRepository } from "src/shared/infrastructure/repositories/base.repository";
import { IUserRepository } from "../../domain/interfaces/user-repository.interface";
import { UserOrmEntity } from "../entities/user-orm-entity";
import { User } from "../../domain/entities/user.entity";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserFactory } from "../../application/factories/user.factory";

@Injectable()
export class UserRepository extends BaseRepository<User, UserOrmEntity> implements IUserRepository {
    private readonly userFactory = new UserFactory();

    constructor(
        @InjectRepository(UserOrmEntity)
        repository: Repository<UserOrmEntity>,
    ) {
        super(repository);
    }

    protected getFactory() {
        return this.userFactory;
    }

    async findByEmail(email: string): Promise<User | null> {
        const entity = await this.repository.findOne({ where: { email } });

        if (!entity) return null;

        return this.userFactory.fromEntity(entity);
    }
}