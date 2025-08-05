import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateOrmEntity } from './infrastructure/entities/candidate-orm.entity';
import { CandidatesController } from './presentation/controllers/candidates.controller';
import { CandidateRepository } from './infrastructure/repositories/candidate.repository';
import { CreateCandidateUseCase } from './application/use-cases/create-candidate.use-case';
import { FindAllCandidatesUseCase } from './application/use-cases/find-all-candidate.use-case';
import { FindCandidateByIdUseCase } from './application/use-cases/find-candidate-by-id.use-case';
import { UpdateCandidateUseCase } from './application/use-cases/update-candidate.use-case';
import { DeleteCandidateUseCase } from './application/use-cases/delete-candidate.use-case';
import { CandidateFactory } from './application/factories/candidate.factory';
import { UserRepository } from '../users/infrastructure/repositories/user.repository';
import { UserOrmEntity } from '../users/infrastructure/entities/user-orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateOrmEntity, UserOrmEntity])],
  controllers: [CandidatesController],
  providers: [
    CreateCandidateUseCase,
    FindAllCandidatesUseCase,
    FindCandidateByIdUseCase,
    UpdateCandidateUseCase,
    DeleteCandidateUseCase,
    {
      provide: 'ICandidateRepository',
      useClass: CandidateRepository,
    },
    {
      provide: 'ICandidateFactory',
      useClass: CandidateFactory,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class CandidatesModule {}
