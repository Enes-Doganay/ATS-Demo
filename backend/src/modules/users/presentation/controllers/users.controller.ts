import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FindAllUserUseCase } from '../../application/use-cases/find-all-user.use-case';
import { FindUserByIdUseCase } from '../../application/use-cases/find-user-by-id.use-case';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { UserDto } from '../../application/dtos/user.dto';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { UpdateUserDto } from '../../application/dtos/update-user.dto';
import { IUserFactory } from '../../domain/interfaces/user-factory.interface';
import { JwtAuthGuard } from 'src/modules/auth/presentation/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/presentation/guards/roles.guard';
import { UserRole } from '../../domain/enums/user-role.enum';
import { Roles } from 'src/modules/auth/presentation/decorators/roles.decorator';
@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
export class UsersController {
  constructor(
    private readonly findAllUserUseCase: FindAllUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @Inject('IUserFactory') private readonly userFactory: IUserFactory,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'All candidates retrieved successfully',
    type: UserDto
  })
  async findAll(): Promise<UserDto[]> {
    const users = await this.findAllUserUseCase.execute();
    return users.map(user => this.userFactory.toDto(user));
  }


  @Get(':id')
  @ApiOkResponse({
    description: 'User found successfully',
    type: UserDto
  })
  @ApiNotFoundResponse({
    description: 'Candidate not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    const user = await this.findUserByIdUseCase.execute(id);
    return this.userFactory.toDto(user);
  }

  @Post()
  @ApiResponse({
    description: 'User created successfully',
    type: UserDto
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const createdUser = await this.createUserUseCase.execute(createUserDto);
    return this.userFactory.toDto(createdUser);
  }

  @Patch(':id')
  @ApiResponse({
    description: 'User updated successfully',
    type: UserDto
  })
  @ApiNotFoundResponse({
    description: 'Candidate not found',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    const updatedUser = await this.updateUserUseCase.execute(id, updateUserDto);
    return this.userFactory.toDto(updatedUser);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'User deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }

}
