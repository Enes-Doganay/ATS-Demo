import { Inject, Injectable } from "@nestjs/common";
import { IAuthService } from "../../domain/interfaces/auth-service.interface";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { LoginDto } from "../dto/login.dto";
import { UserFactory } from "src/modules/users/application/factories/user.factory";

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('IAuthService') private readonly authService: IAuthService,
        @Inject('IBaseFactory') private readonly userFactory: UserFactory, 
    ) {}

    async execute(loginDto: LoginDto): Promise<AuthResponseDto> {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        const session = await this.authService.login(user);

        return {
            access_token: session.accessToken,
            refresh_token: session.refreshToken,
            expires_in: Math.floor((session.expiresAt.getTime() - Date.now()) / 1000),
            user: this.userFactory.toDto(user),
        }
    }
}