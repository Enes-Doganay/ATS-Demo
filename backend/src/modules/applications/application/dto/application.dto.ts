import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../domain/enums/status.enum';
import { IsDate, IsDateString, IsEnum, IsInt } from 'class-validator';

export class ApplicationDto {
    @ApiProperty({ description: 'The ID of the application', example: 1 })
    @IsInt()
    id: number;

    @ApiProperty({ description: 'The ID of the candidate', example: 1 })
    @IsInt()
    candidate_id: number;

    @ApiProperty({ description: 'The ID of the job posting', example: 1 })
    @IsInt()
    job_posting_id: number;

    @ApiProperty({ description: 'The date when the application was submitted', example: '2024-01-15T10:30:00Z' })
    @IsDateString()
    applied_at: string;

    @ApiProperty({ 
        description: 'The status of the application', 
        example: 'applied',
        enum: Status
    })
    @IsEnum(Status)
    status: Status;
}