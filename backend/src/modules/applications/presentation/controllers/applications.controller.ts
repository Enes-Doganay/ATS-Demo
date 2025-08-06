import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateApplicationDto } from '../../application/dto/create-application.dto';
import { CreateApplicationUseCase } from '../../application/use-cases/create-application.use-case';
import { DeleteApplicationUseCase } from '../../application/use-cases/delete-application.use-case';
import { FindApplicationByIdUseCase } from '../../application/use-cases/find-application-by-id.use-case';
import { FindAllApplicationUseCase } from '../../application/use-cases/find-all-application.use-case';
import { UpdateApplicationUseCase } from '../../application/use-cases/update-application.use-case';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ApplicationDto } from '../../application/dto/application.dto';
import { IApplicationFactory } from '../../domain/interfaces/application-factory.interface';
import { UpdateApplicationDto } from '../../application/dto/update-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly createApplicationUseCase: CreateApplicationUseCase,
    private readonly deleteApplicationUseCase: DeleteApplicationUseCase,
    private readonly findAllApplicationsUseCase: FindAllApplicationUseCase,
    private readonly findApplicationByIdUseCase: FindApplicationByIdUseCase,
    private readonly updateApplicationUseCase: UpdateApplicationUseCase,
    @Inject('IApplicationFactory') private readonly applicationFactory: IApplicationFactory,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Application created successfully',
    type: ApplicationDto,
  })
  async create(@Body() createApplicationDto: CreateApplicationDto): Promise<ApplicationDto> {
    const createdApplication = await this.createApplicationUseCase.execute(createApplicationDto);
    return this.applicationFactory.toDto(createdApplication);
  }

  @Get()
  @ApiOkResponse({
    description: 'All applications retrieved successfully',
    type: ApplicationDto,
  })
  async findAll(): Promise<ApplicationDto[]> {
    const applications = await this.findAllApplicationsUseCase.execute();
    return applications.map(app => this.applicationFactory.toDto(app));
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Application found successfully',
    type: ApplicationDto,
  })
  @ApiNotFoundResponse({
    description: 'Application not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ApplicationDto> {
    const application = await this.findApplicationByIdUseCase.execute(id);
    return this.applicationFactory.toDto(application);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Application updated successfully',
    type: ApplicationDto,
  })
  @ApiNotFoundResponse({
    description: 'Application not found',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateApplicationDto: UpdateApplicationDto): Promise<ApplicationDto> {
    const updatedApplication = await this.updateApplicationUseCase.execute(id, updateApplicationDto);
    return this.applicationFactory.toDto(updatedApplication);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Application deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Application not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteApplicationUseCase.execute(id);
  }
}
