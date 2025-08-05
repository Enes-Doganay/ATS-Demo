import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateJobPostingDto } from '../../application/dto/create-job-posting.dto';
import { UpdateJobPostingDto } from '../../application/dto/update-job-posting.dto';
import { CreateJobPostingUseCase } from '../../application/use-cases/create-job-posting.use-case';
import { UpdateJobPostingUseCase } from '../../application/use-cases/update-job-posting.use-case';
import { FindJobPostingByIdUseCase } from '../../application/use-cases/find-job-posting-by-id.use-case';
import { DeleteJobPostingUseCase } from '../../application/use-cases/delete-job-posting.use-case';
import { JobPostingFactory } from '../../domain/factories/job-posting.factory';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { JobPostingDto } from '../../application/dto/job-posting.dto';
import { FindAllJobPostingUseCase } from '../../application/use-cases/find-all-job-posting.use-case';

@Controller('job-postings')
export class JobPostingsController {
  constructor(
    private readonly createJobPostingUseCase: CreateJobPostingUseCase,
    private readonly updateJobPostingUseCase: UpdateJobPostingUseCase,
    private readonly findJobPostingByIdUseCase: FindJobPostingByIdUseCase,
    private readonly deleteJobPostingUseCase: DeleteJobPostingUseCase,
    private readonly findAllJobPostingsUseCase: FindAllJobPostingUseCase,
    @Inject('IJobPostingFactory') private readonly jobPostingFactory: JobPostingFactory,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Job Posting created successfully',
    type: JobPostingDto,
  })
  async create(@Body() createJobPostingDto: CreateJobPostingDto): Promise<JobPostingDto> {
    const jobPosting =  await this.createJobPostingUseCase.execute(createJobPostingDto);
    return this.jobPostingFactory.toDto(jobPosting);
  }

  @Get()
  @ApiOkResponse({
    description: 'All job postings retrieved successfully',
    type: JobPostingDto,
  })
  async findAll(): Promise<JobPostingDto[]> {
    const jobPostings = await this.findAllJobPostingsUseCase.execute();
    return jobPostings.map(jobPosting => this.jobPostingFactory.toDto(jobPosting));
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Job Posting found successfully',
    type: JobPostingDto,
  })
  @ApiNotFoundResponse({
    description: 'Job Posting not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<JobPostingDto> {
    const jobPosting = await this.findJobPostingByIdUseCase.execute(id);
    return this.jobPostingFactory.toDto(jobPosting);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Job Posting updated successfully',
    type: JobPostingDto,
  })
  @ApiNotFoundResponse({
    description: 'Job Posting not found',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateJobPostingDto: UpdateJobPostingDto): Promise<JobPostingDto> {
    const jobPosting = await this.updateJobPostingUseCase.execute(id, updateJobPostingDto);
    return this.jobPostingFactory.toDto(jobPosting);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Job Posting deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Job Posting not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteJobPostingUseCase.execute(id);
  }
}
