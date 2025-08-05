import { IsEmail, IsEnum, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../domain/enums/user-role.enum';

export class UserDto {
    @ApiProperty({ description: 'The ID of the user', example: 1 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'The name of the user', example: 'Enes Doğanay' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'The email of the user', example: 'enes@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The password of the user', example: 'securepassword123' })
    @IsString()
    password: string;

    @ApiProperty({ description: 'The role of the user', example: 'admin'})
    @IsEnum(UserRole)
    role: UserRole;
}
