import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";
import { UserRole } from "../../domain/enums/user-role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ description: 'The name of the user', example: 'Enes Doğanay' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'The email of the user', example: 'enes@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The password of the user', example: 'securepassword123' })
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;

    @ApiProperty({ description: 'The role of the user', example: 'admin'})
    @IsEnum(UserRole, {
        message: 'Role must be either "admin" or "recruiter"',
    })
    role: UserRole;
}
