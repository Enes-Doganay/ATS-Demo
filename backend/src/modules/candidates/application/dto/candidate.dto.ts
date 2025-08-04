import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class CandidateDto {
    @ApiProperty({ description: 'The ID of the candidate', example: 1 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'The ID of the user', example: 1 })
    @IsInt()
    user_id: number;

    @ApiProperty({ description: 'The first name of the candidate', example: 'Enes' })
    @IsString()
    first_name: string;

    @ApiProperty({ description: 'The last name of the candidate', example: 'Doğanay' })
    @IsString()
    last_name: string;

    @ApiProperty({ description: 'The email of the candidate', example: 'enes@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The phone number of the candidate', example: '+1234567890', required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ description: 'The resume URL of the candidate', example: 'http://example.com/resume.pdf', required: false })
    @IsOptional()
    @IsString()
    resume_url?: string;
}