import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { IAuthService } from "../../domain/interfaces/auth-service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('IAuthService') private readonly authService: IAuthService)
    {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        return user;
    }
}