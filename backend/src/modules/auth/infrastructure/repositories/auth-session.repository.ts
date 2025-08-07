import { Injectable } from "@nestjs/common";
import { AuthSession } from "../../domain/entities/auth-session.entity";
import { IAuthSessionRepository } from "../../domain/interfaces/auth-session-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthSessionOrmEntity } from "../entities/auth-session-orm.entity";
import { BaseRepository } from "src/shared/infrastructure/repositories/base.repository";
import { AuthSessionFactory } from "../../application/factories/auth-session.factory";

@Injectable()
export class AuthSessionRepository extends BaseRepository<AuthSession, AuthSessionOrmEntity> implements IAuthSessionRepository {
    private readonly authSessionFactory = new AuthSessionFactory();

    constructor(
        @InjectRepository(AuthSessionOrmEntity)
        repository: Repository<AuthSessionOrmEntity>
    ) {
        super(repository);
    }

    protected getFactory() {
        return this.authSessionFactory;
    }

    async findByRefreshToken(token: string): Promise<AuthSession | null> {
        const entity = await this.repository.findOne({ where: { refreshToken: token } });
        
        if (!entity) return null;

        return this.authSessionFactory.fromEntity(entity);
    }

    async deleteByUserId(userId: number): Promise<void> {
        await this.repository.delete({ userId });
    }
}