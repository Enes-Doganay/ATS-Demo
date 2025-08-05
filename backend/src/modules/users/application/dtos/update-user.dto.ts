import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../domain/enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ description: 'The name of the user', example: 'Enes Doğanay' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'The email of the user', example: 'enes@example.com' })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: 'The password of the user', example: 'securepassword123' })
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty({ description: 'The role of the user', example: 'admin'})
    @IsEnum(UserRole, {
        message: 'Role must be either "admin" or "recruiter"',
    })
    @IsOptional()
    role?: UserRole;
}
