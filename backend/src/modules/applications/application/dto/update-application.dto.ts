import { PartialType } from '@nestjs/swagger';
import { CreateApplicationDto } from './create-application.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Status } from '../../domain/enums/status.enum';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
    @ApiProperty({ 
        description: 'The status of the application', 
        example: 'shortlisted',
        enum: Status,
        required: false
    })
    @IsOptional()
    @IsEnum(Status, {
        message: 'Status must be either "applied", "rejected", or "shortlisted"',
    })
    status?: Status;
}