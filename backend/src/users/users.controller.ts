import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';

type TCreateUserBody = {
  email: string;
  passwordHash: string;
  nickname?: string;
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  //test
  @Post()
  create(@Body() body: TCreateUserBody) {
    return this.usersService.create({
      email: body.email,
      passwordHash: body.passwordHash,
      nickname: body.nickname,
    });
  }
}
