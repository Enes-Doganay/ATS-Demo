import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class CreateCandidateDto {
    @IsInt()
    user_id: number;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    resume_url?: string;
}
