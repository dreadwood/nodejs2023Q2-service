import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagesResponse } from 'src/const';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(MessagesResponse.USER_NOT_FOUND);
    }

    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const updateValue = this.userService.update(id, updatePasswordDto);

    if (typeof updateValue !== 'string') {
      return updateValue;
    }

    switch (updateValue) {
      case MessagesResponse.USER_NOT_FOUND:
        throw new NotFoundException(MessagesResponse.USER_NOT_FOUND);

      case MessagesResponse.PASSWORD_WRONG:
        throw new ForbiddenException(MessagesResponse.PASSWORD_WRONG);

      default:
        throw new InternalServerErrorException(
          MessagesResponse.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.userService.remove(id);

    if (!user) {
      throw new NotFoundException(MessagesResponse.USER_NOT_FOUND);
    }
  }
}
