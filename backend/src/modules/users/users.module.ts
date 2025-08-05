import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controllers/users.controller';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserFactory } from './application/factories/user.factory';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindAllUserUseCase } from './application/use-cases/find-all-user.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/entities/user-orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    FindAllUserUseCase,
    FindUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IUserFactory',
      useClass: UserFactory,
    },
  ],
})
export class UsersModule {}
