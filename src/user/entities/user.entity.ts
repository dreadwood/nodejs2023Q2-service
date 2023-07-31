import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserEntity {
  @IsUUID(4)
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;
}
