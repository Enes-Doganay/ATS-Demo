import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsEnum, IsDateString } from "class-validator";
import { Status } from "../../domain/enums/status.enum";

export class CreateApplicationDto {
    @ApiProperty({ description: 'The ID of the candidate', example: 1 })
    @IsInt()
    candidate_id: number;

    @ApiProperty({ description: 'The ID of the job posting', example: 1 })
    @IsInt()
    job_posting_id: number;

    @ApiProperty({ 
        description: 'The date when the application was submitted', 
        example: '2024-01-15T10:30:00Z'
    })
    @IsDateString()
    applied_at: string;

    @ApiProperty({ 
        description: 'The status of the application', 
        example: 'applied',
        enum: Status,
        default: Status.APPLIED
    })
    @IsEnum(Status, {
        message: 'Status must be either "applied", "rejected", or "shortlisted"',
    })
    status: Status;
}