import { Module } from '@nestjs/common';
import { JobPostingsController } from './presentation/controllers/job-postings.controller';
import { JobPostingRepository } from './infrastructure/repositories/job-posting.repository';
import { CreateJobPostingUseCase } from './application/use-cases/create-job-posting.use-case';
import { UpdateJobPostingUseCase } from './application/use-cases/update-job-posting.use-case';
import { FindJobPostingByIdUseCase } from './application/use-cases/find-job-posting-by-id.use-case';
import { FindAllJobPostingUseCase } from './application/use-cases/find-all-job-posting.use-case';
import { DeleteJobPostingUseCase } from './application/use-cases/delete-job-posting.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPostingOrmEntity } from './infrastructure/entities/job-posting-orm.entity';
import { UserRepository } from '../users/infrastructure/repositories/user.repository';
import { UserOrmEntity } from '../users/infrastructure/entities/user-orm-entity';
import { JobPostingFactory } from './application/factories/job-posting.factory';

@Module({
  imports: [TypeOrmModule.forFeature([JobPostingOrmEntity, UserOrmEntity])],
  controllers: [JobPostingsController],
  providers: [
    CreateJobPostingUseCase,
    UpdateJobPostingUseCase,
    FindJobPostingByIdUseCase,
    FindAllJobPostingUseCase,
    DeleteJobPostingUseCase,
    {
      provide: 'IJobPostingRepository',
      useClass: JobPostingRepository,
    },
    {
      provide: 'IJobPostingFactory',
      useClass: JobPostingFactory,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class JobPostingsModule {}
