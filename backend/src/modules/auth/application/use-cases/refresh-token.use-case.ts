import { Inject } from "@nestjs/common";
import { IAuthService } from "../../domain/interfaces/auth-service.interface";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { UserFactory } from "src/modules/users/application/factories/user.factory";

export class RefreshTokenUseCase {
    constructor(
        @Inject('IAuthService') private readonly authService: IAuthService,
        @Inject('IBaseFactory') private readonly userFactory: UserFactory
    ) {}

    async execute(refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
        const result = await this.authService.refreshToken(refreshTokenDto.refresh_token);

        return {
            access_token: result.session.accessToken,
            refresh_token: result.session.refreshToken,
            expires_in: Math.floor((result.session.expiresAt.getTime() - Date.now()) / 1000),
            user: this.userFactory.toDto(result.user),
        };
    }
}