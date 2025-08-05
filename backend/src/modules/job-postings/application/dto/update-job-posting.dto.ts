import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateJobPostingDto } from './create-job-posting.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateJobPostingDto extends PartialType(CreateJobPostingDto) {
    @ApiProperty( { description: 'The title of the job posting', example: 'Software Engineer' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty( { description: 'The description of the job posting', example: 'We are looking for a Software Engineer...' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty( { description: 'The location of the job posting', example: 'New York, NY' })
    @IsOptional()
    @IsString()
    location?: string;


    @ApiProperty( { description: 'The ID of the user who posted the job', example: 1 })
    @IsOptional()
    @IsInt()
    postedBy?: number;
}
