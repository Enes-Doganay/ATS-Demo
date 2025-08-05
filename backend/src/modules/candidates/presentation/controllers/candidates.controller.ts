import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject } from '@nestjs/common';
import { CreateCandidateDto } from '../../application/dto/create-candidate.dto';
import { UpdateCandidateDto } from '../../application/dto/update-candidate.dto';
import { CreateCandidateUseCase } from '../../application/use-cases/create-candidate.use-case';
import { FindAllCandidatesUseCase } from '../../application/use-cases/find-all-candidate.use-case';
import { FindCandidateByIdUseCase } from '../../application/use-cases/find-candidate-by-id.use-case';
import { UpdateCandidateUseCase } from '../../application/use-cases/update-candidate.use-case';
import { DeleteCandidateUseCase } from '../../application/use-cases/delete-candidate.use-case';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CandidateDto } from '../../application/dto/candidate.dto';
import { ICandidateFactory } from '../../domain/interfaces/candidate-factory.interface';

@ApiTags('Candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(
    private readonly createCandidateUseCase: CreateCandidateUseCase,
    private readonly findAllCandidatesUseCase: FindAllCandidatesUseCase,
    private readonly findCandidateByIdUseCase: FindCandidateByIdUseCase,
    private readonly updateCandidateUseCase: UpdateCandidateUseCase,
    private readonly deleteCandidateUseCase: DeleteCandidateUseCase,
    @Inject('ICandidateFactory') private readonly candidateFactory: ICandidateFactory,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Candidate created successfully',
    type: CandidateDto,
  })
  async create(@Body() createCandidateDto: CreateCandidateDto): Promise<CandidateDto> {
    const createdCandidate = await this.createCandidateUseCase.execute(createCandidateDto);
    return this.candidateFactory.toDto(createdCandidate);
  }

  @Get()
  @ApiOkResponse({
    description: 'All candidates retrieved successfully',
    type: CandidateDto
  })
  async findAll(): Promise<CandidateDto[]> {
    const candidates = await this.findAllCandidatesUseCase.execute();
    return candidates.map(c => this.candidateFactory.toDto(c));
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Candidate found successfully',
    type: CandidateDto
  })
  @ApiNotFoundResponse({
    description: 'Candidate not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CandidateDto> {
    const candidate = await this.findCandidateByIdUseCase.execute(id);
    return this.candidateFactory.toDto(candidate);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Candidate updated successfully',
    type: CandidateDto
  })
  @ApiNotFoundResponse({
    description: 'Candidate not found',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCandidateDto: UpdateCandidateDto): Promise<CandidateDto> {
    const updatedCandidate = await this.updateCandidateUseCase.execute(id, updateCandidateDto);
    return this.candidateFactory.toDto(updatedCandidate);
  }

  @ApiOkResponse({
    description: 'Candidate deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Candidate not found',
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteCandidateUseCase.execute(id);
  }
}
