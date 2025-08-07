import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../users/infrastructure/entities/user-orm-entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './infrastructure/services/auth.service';
import { UserRepository } from '../users/infrastructure/repositories/user.repository';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { LogoutUseCase } from './application/use-cases/logout.use-case';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { JwtAuthGuard } from './presentation/guards/jwt-auth.guard';
import { AuthSessionRepository } from './infrastructure/repositories/auth-session.repository';
import { AuthSessionFactory } from './application/factories/auth-session.factory';
import { AuthSessionOrmEntity } from './infrastructure/entities/auth-session-orm.entity';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.use-case';
import { JwtService } from './infrastructure/services/jwt.service';
import { UserFactory } from '../users/application/factories/user.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity, AuthSessionOrmEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN', '15m'),
        },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    JwtStrategy,
    LocalStrategy,
    JwtAuthGuard,
    AuthSessionFactory,
    {
      provide: 'IAuthService',
      useClass: AuthService,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IJwtService',
      useClass: JwtService,
    },
    {
      provide: 'IAuthSessionRepository',
      useClass: AuthSessionRepository,
    },
    {
      provide: 'IBaseFactory',
      useClass: UserFactory
    }
  ],
  exports: ['IAuthService', JwtAuthGuard, 'IAuthSessionRepository'],
})
export class AuthModule {}
