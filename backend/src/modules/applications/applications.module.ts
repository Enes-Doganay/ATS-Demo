import { Module } from '@nestjs/common';
import { ApplicationsController } from './presentation/controllers/applications.controller';
import { ApplicationOrmEntity } from './infrastructure/entities/application-orm.entity';
import { CreateApplicationUseCase } from './application/use-cases/create-application.use-case';
import { DeleteApplicationUseCase } from './application/use-cases/delete-application.use-case';
import { FindApplicationByIdUseCase } from './application/use-cases/find-application-by-id.use-case';
import { FindAllApplicationUseCase } from './application/use-cases/find-all-application.use-case';
import { ApplicationRepository } from './infrastructure/repositories/application.repository';
import { ApplicationFactory } from './application/factories/application.factory';
import { CandidateOrmEntity } from '../candidates/infrastructure/entities/candidate-orm.entity';
import { CandidateRepository } from '../candidates/infrastructure/repositories/candidate.repository';
import { JobPostingOrmEntity } from '../job-postings/infrastructure/entities/job-posting-orm.entity';
import { JobPostingRepository } from '../job-postings/infrastructure/repositories/job-posting.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateApplicationUseCase } from './application/use-cases/update-application.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationOrmEntity, CandidateOrmEntity, JobPostingOrmEntity])],
  controllers: [ApplicationsController],
  providers: [
    CreateApplicationUseCase,
    UpdateApplicationUseCase,
    FindAllApplicationUseCase,
    FindApplicationByIdUseCase,
    DeleteApplicationUseCase,
    {
      provide: 'IApplicationFactory',
      useClass: ApplicationFactory,
    },
    {
      provide: 'IApplicationRepository',
      useClass: ApplicationRepository,
    },
    {
      provide: 'ICandidateRepository',
      useClass: CandidateRepository,
    },
    {
      provide: 'IJobPostingRepository',
      useClass: JobPostingRepository,
    }
  ],
})
export class ApplicationsModule {}
