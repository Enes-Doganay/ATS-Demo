import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateDto } from './create-candidate.dto';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {
    @ApiProperty({ description: 'The ID of the user', example: 1, required: false })
    @IsOptional()
    @IsInt()
    user_id?: number;

    @ApiProperty({ description: 'The first name of the candidate', example: 'Enes', required: false })
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiProperty({ description: 'The last name of the candidate', example: 'Doğanay', required: false })
    @IsOptional()
    @IsString()
    last_name?: string;

    @ApiProperty({ description: 'The email of the candidate', example: 'enes@example.com', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: 'The phone number of the candidate', example: '+1234567890', required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ description: 'The resume URL of the candidate', example: 'http://example.com/resume.pdf', required: false })
    @IsOptional()
    @IsString()
    resume_url?: string;
}
