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
    constructor(
        @InjectRepository(UserOrmEntity)
        repository: Repository<UserOrmEntity>,
        @Inject('IUserFactory') private readonly userFactory: UserFactory
    ) {
        super(repository);
    }

    protected getFactory() {
        return this.userFactory;
    }    
}