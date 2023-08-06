import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryUserStorage } from './store/in-memory-user.storage';

@Module({
  controllers: [UserController],
  providers: [UserService, InMemoryUserStorage],
})
export class UserModule {}
