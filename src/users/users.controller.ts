import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() object: CreateUserDto): Promise<UsersEntity> {
    try {
      return await this.usersService.create(object);
    } catch (e) {
      throw new Error(`Falha ao criar usuário: ${e.message}`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() object: Partial<UsersEntity>,
  ): Promise<any> {
    try {
      return await this.usersService.update(+id, object);
    } catch (e) {
      throw new Error(`Falha ao atualizar usuário: ${e.message}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UsersEntity> {
    try {
      return await this.usersService.findOne(+id);
    } catch (e) {
      throw e;
    }
  }

  @Patch('change-password')
  async changePassword(@Body() object: ChangePasswordDto): Promise<any> {
    try {
      await this.usersService.changePassword(object);
      return { message: 'Sucesso ao atualizar senha' };
    } catch (e) {
      const message = `Erro ao atualizar senha: ${e.message}`;
      throw { ...e, message };
    }
  }
}
