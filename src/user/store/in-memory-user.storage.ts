import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserStorage } from '../interfaces/user-storage.interfaces';
import { UserEntity } from '../entities/user.entity';
import { UserResponseEntity } from '../entities/user-response.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class InMemoryUserStorage implements UserStorage {
  private users: UserEntity[] = [];

  findAll() {
    return this.users.map((user) => this.removeUserPassword(user));
  }

  findOne(id: string): UserResponseEntity | null {
    const user = this.users.find((user) => user.id === id);

    return user ? this.removeUserPassword(user) : null;
  }

  create(dto: CreateUserDto): UserResponseEntity {
    const date = Date.now();
    const newUser = {
      ...dto,
      id: uuidv4(),
      version: 1,
      createdAt: date,
      updatedAt: date,
    };

    this.users.push(newUser);

    return this.removeUserPassword(newUser);
  }

  private removeUserPassword(user: UserEntity): UserResponseEntity {
    const preparedUser = { ...user };
    delete preparedUser.password;

    return preparedUser;
  }
}
