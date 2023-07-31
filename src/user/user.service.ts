import { Injectable } from '@nestjs/common';
import { InMemoryUserStorage } from './store/in-memory-user.storage';
import { CreateUserDto } from './dto/create-user.dto';

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
}
