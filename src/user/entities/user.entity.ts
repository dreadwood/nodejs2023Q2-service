import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserEntity {
  @IsUUID(4)
  id: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;
}
