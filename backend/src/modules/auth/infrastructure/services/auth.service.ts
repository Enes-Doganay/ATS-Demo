import { User } from "src/modules/users/domain/entities/user.entity";
import { AuthSession } from "../../domain/entities/auth-session.entity";
import { IAuthService } from "../../domain/interfaces/auth-service.interface";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { IUserRepository } from "src/modules/users/domain/interfaces/user-repository.interface";
import { IJwtService } from "../../domain/interfaces/jwt-service.interface";
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { IAuthSessionRepository } from "../../domain/interfaces/auth-session-repository.interface";
import { InvalidCredentialsError } from "../../domain/errors/invalid-credentials.error";
import { EntityNotFoundError } from "src/shared/domain/errors/entity-not-found.error";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
        @Inject('IJwtService') private readonly jwtService: IJwtService,
        @Inject('IAuthSessionRepository') private readonly authSessionRepository: IAuthSessionRepository,
        private readonly configService: ConfigService,
    ) {}
    
    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new InvalidCredentialsError();
        }

        return user;
    }

    async login(user: User): Promise<AuthSession> {
        await this.authSessionRepository.deleteByUserId(user.id);

        const payload = { email: user.email, sub: user.id, role: user.role};

        const accessToken = this.jwtService.generateAccessToken(payload);
        const refreshToken = this.jwtService.generateRefreshToken(payload);
        
        const expiresAt = new Date();
        const expiresIn = this.configService.get('JWT_EXPIRES_IN');

        expiresAt.setMinutes(expiresAt.getMinutes() + expiresIn);

        const session = new AuthSession(
            0,
            user.id,
            accessToken,
            refreshToken,
            expiresAt,
            new Date(),
        );

        return await this.authSessionRepository.create(session);
    }

    async logout(userId: number): Promise<void> {
        await this.authSessionRepository.deleteByUserId(userId);
    }

    async refreshToken(refreshToken: string): Promise<{ session: AuthSession; user: User }> {
        const payload = this.jwtService.verifyRefreshToken(refreshToken);
        const user = await this.userRepository.findById(payload.sub);

        if (!user) {
            throw new EntityNotFoundError('User', payload.sub);
        }

        const oldSession = await this.authSessionRepository.findByRefreshToken(refreshToken);
        if (oldSession) {
            await this.authSessionRepository.delete(oldSession.id);
        }

        const session = await this.login(user);
        return { session, user };
    }

    async validateTokenPayload(payload: any): Promise<User | null> {
        if (!payload || !payload.sub) {
            return null;
        }

        return await this.userRepository.findById(payload.sub);
    }
} 