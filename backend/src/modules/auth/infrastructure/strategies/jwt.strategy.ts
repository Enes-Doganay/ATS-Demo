import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthService } from "../../domain/interfaces/auth-service.interface";
import { EntityNotFoundError } from "src/shared/domain/errors/entity-not-found.error";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        @Inject('IAuthService') private readonly authService: IAuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET') || '',
        });
    }

    async validate(payload: any){
        const user = await this.authService.validateTokenPayload(payload);

        if (!user) {
            throw new UnauthorizedException('Invalid token or user not found');
        }
        return user;
    }
}