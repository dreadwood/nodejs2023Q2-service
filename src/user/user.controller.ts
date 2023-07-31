import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { isUUID } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException(
        'User ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.userService.findOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
