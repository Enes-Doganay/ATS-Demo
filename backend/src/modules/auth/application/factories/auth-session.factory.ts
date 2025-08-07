import { BaseFactory } from "src/shared/domain/factories/base.factory";
import { AuthSession } from "../../domain/entities/auth-session.entity";
import { AuthSessionOrmEntity } from "../../infrastructure/entities/auth-session-orm.entity";
import { AuthResponseDto } from "../dto/auth-response.dto";

export class AuthSessionFactory extends BaseFactory<AuthSession, AuthSessionOrmEntity, any, any, AuthResponseDto> {
    createFromDto(dto: any): AuthSession | Promise<AuthSession> {
        throw new Error("Method not implemented.");
    }

    fromEntity(entity: AuthSessionOrmEntity): AuthSession {
        return new AuthSession(
            entity.id,
            entity.userId,
            entity.accessToken,
            entity.refreshToken,
            entity.expiresAt,
            entity.createdAt,
            entity.updatedAt,
        );
    }

    toEntity(domain: AuthSession): AuthSessionOrmEntity {
        const entity = new AuthSessionOrmEntity();

        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.accessToken = domain.accessToken;
        entity.refreshToken = domain.refreshToken;
        entity.expiresAt = domain.expiresAt;
        entity.createdAt = domain.createdAt;
        entity.updatedAt = domain.updatedAt ?? new Date();

        return entity;
    }

    updateFromDto(existing: AuthSession, dto: any): AuthSession | Promise<AuthSession> {
        throw new Error("Method not implemented.");
    }

    toDto(domain: AuthSession): AuthResponseDto {
        return {
            access_token: domain.accessToken,
            refresh_token: domain.refreshToken,
            expires_in: Math.floor((domain.expiresAt.getTime() - new Date().getTime()) / 1000),
            user: null as any,
        }
    }

}