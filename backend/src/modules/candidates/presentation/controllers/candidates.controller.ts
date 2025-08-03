import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateCandidateDto } from '../../application/dto/create-candidate.dto';
import { UpdateCandidateDto } from '../../application/dto/update-candidate.dto';
import { CreateCandidateUseCase } from '../../application/use-cases/create-candidate.use-case';
import { FindAllCandidatesUseCase } from '../../application/use-cases/find-all-candidate.use-case';
import { FindCandidateByIdUseCase } from '../../application/use-cases/find-candidate-by-id.use-case';
import { UpdateCandidateUseCase } from '../../application/use-cases/update-candidate.use-case';
import { DeleteCandidateUseCase } from '../../application/use-cases/delete-candidate.use-case';

@Controller('candidates')
export class CandidatesController {
  constructor(
    private readonly createCandidateUseCase: CreateCandidateUseCase,
    private readonly findAllCandidatesUseCase: FindAllCandidatesUseCase,
    private readonly findCandidateByIdUseCase: FindCandidateByIdUseCase,
    private readonly updateCandidateUseCase: UpdateCandidateUseCase,
    private readonly deleteCandidateUseCase: DeleteCandidateUseCase,
  ) {}

  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.createCandidateUseCase.execute(createCandidateDto);
  }

  @Get()
  findAll() {
    return this.findAllCandidatesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.findCandidateByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCandidateDto: UpdateCandidateDto) {
    return this.updateCandidateUseCase.execute(id, updateCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteCandidateUseCase.execute(id);
  }
}
