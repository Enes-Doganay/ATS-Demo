import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateDto } from './create-candidate.dto';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {
    @IsOptional()
    @IsInt()
    user_id?: number;

    @IsOptional()
    @IsString()
    first_name?: string;

    @IsOptional()
    @IsString()
    last_name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    resume_url?: string;
}
