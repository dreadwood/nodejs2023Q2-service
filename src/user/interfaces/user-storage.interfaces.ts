import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseEntity } from '../entities/user-response.entity';
// import { UserEntity } from '../entities/user.entity';

export interface UserStorage {
  findAll: () => UserResponseEntity[];
  findOne: (id: string) => UserResponseEntity | null;
  // findRawOne: (id: string) => UserEntity | null;
  create: (params: CreateUserDto) => UserResponseEntity;
  // update: (id: string, newPassword: string) => UserResponseEntity | false;
  // remove: (id: string) => void | false;
}
