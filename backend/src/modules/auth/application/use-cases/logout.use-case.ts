import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { IAuthService } from "../../domain/interfaces/auth-service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LogoutUseCase {
    constructor(
        @Inject('IAuthService') private readonly authService: IAuthService
    ) {}

    async execute(userId: number): Promise<void> {
        await this.authService.logout(userId);
    }
}