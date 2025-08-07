import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/modules/users/application/dtos/user.dto";

export class AuthResponseDto {
    @ApiProperty({description: 'JWT access token'})
    access_token: string;

    @ApiProperty({description: 'JWT refresh token'})
    refresh_token: string;

    @ApiProperty({description: 'Token expiration time in seconds'})
    expires_in: number;

    @ApiProperty({description: 'User information', type: UserDto})
    user: UserDto
}