import { Injectable } from '@nestjs/common';
import { InMemoryUserStorage } from './store/in-memory-user.storage';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { MessagesResponse } from 'src/const';
import { UserResponseEntity } from './entities/user-response.entity';

@Injectable()
export class UserService {
  constructor(private storage: InMemoryUserStorage) {}

  create(dto: CreateUserDto) {
    return this.storage.create(dto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  update(
    id: string,
    dto: UpdatePasswordDto,
  ): MessagesResponse | UserResponseEntity {
    const userRaw = this.storage.findRawOne(id);

    if (!userRaw) {
      return MessagesResponse.USER_NOT_FOUND;
    }

    if (userRaw.password !== dto.oldPassword) {
      return MessagesResponse.PASSWORD_WRONG;
    }

    return this.storage.update(id, dto.newPassword);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
