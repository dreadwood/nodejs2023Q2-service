import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserStorage } from '../interfaces/user-storage.interfaces';
import { UserEntity } from '../entities/user.entity';
import { UserResponseEntity } from '../entities/user-response.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { DEFAULT_VERSION_USER } from 'src/const';

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

  findRawOne(id: string): UserEntity | null {
    const user = this.users.find((user) => user.id === id);

    return user ?? null;
  }

  create(dto: CreateUserDto): UserResponseEntity {
    const date = Date.now();
    const newUser = {
      ...dto,
      id: uuidv4(),
      version: DEFAULT_VERSION_USER,
      createdAt: date,
      updatedAt: date,
    };

    this.users.push(newUser);

    return this.removeUserPassword(newUser);
  }

  update(id: string, newPassword: string): UserResponseEntity {
    const updateIndex = this.users.findIndex((user) => user.id === id);

    this.users[updateIndex] = {
      ...this.users[updateIndex],
      password: newPassword,
      version: this.users[updateIndex].version + 1,
      updatedAt: Date.now(),
    };

    return this.removeUserPassword(this.users[updateIndex]);
  }

  remove(id: string): boolean {
    const removeIndex = this.users.findIndex((user) => user.id === id);

    if (removeIndex === -1) {
      return false;
    }

    this.users = [
      ...this.users.slice(0, removeIndex),
      ...this.users.slice(removeIndex + 1),
    ];

    return true;
  }

  private removeUserPassword(user: UserEntity): UserResponseEntity {
    const preparedUser = { ...user };
    delete preparedUser.password;

    return preparedUser;
  }
}
