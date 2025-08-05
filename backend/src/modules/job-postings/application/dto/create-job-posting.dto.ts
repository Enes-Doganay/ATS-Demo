import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateJobPostingDto {
    @ApiProperty( { description: 'The title of the job posting', example: 'Software Engineer' })
    @IsString()
    title: string;

    @ApiProperty( { description: 'The description of the job posting', example: 'We are looking for a Software Engineer...' })
    @IsString()
    description: string;

    @ApiProperty( { description: 'The location of the job posting', example: 'New York, NY' })
    @IsString()
    location: string;

    @ApiProperty( { description: 'The ID of the user who posted the job', example: 1 })
    @IsInt()
    postedBy: number;
}
