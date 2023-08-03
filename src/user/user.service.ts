import { Injectable } from '@nestjs/common';
import { InMemoryUserStorage } from './store/in-memory-user.storage';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MessagesResponse } from 'src/const';
import { UserResponseEntity } from './entities/user-response.entity';

@Injectable()
export class UserService {
  constructor(private storage: InMemoryUserStorage) {}

  create(createUserDto: CreateUserDto) {
    return this.storage.create(createUserDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): MessagesResponse | UserResponseEntity {
    const userRaw = this.storage.findRawOne(id);

    if (!userRaw) {
      return MessagesResponse.USER_NOT_FOUND;
    }

    if (userRaw.password !== updatePasswordDto.oldPassword) {
      return MessagesResponse.PASSWORD_WRONG;
    }

    return this.storage.update(id, updatePasswordDto.newPassword);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
