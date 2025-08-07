import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtService } from '../../domain/interfaces/jwt-service.interface';
import { InvalidTokenError } from '../../domain/errors/invalid-token.error';

@Injectable()
export class JwtService implements IJwtService {
    constructor(
        private readonly jwtService: NestJwtService,
        private readonly configService: ConfigService,
    ) {}

    generateAccessToken(payload: any): string {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
        });
    }

    generateRefreshToken(payload: any): string {
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET', this.configService.get('JWT_SECRET')),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
        });
    }

    verifyToken(token: string): any {
        return this.jwtService.verify(token, {
            secret: this.configService.get('JWT_SECRET'),
        });
    }

    verifyRefreshToken(token: string): any {
        return this.jwtService.verify(token, {
            secret: this.configService.get('JWT_REFRESH_SECRET', this.configService.get('JWT_SECRET')),
        });
    }
}