import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ArtistEntity {
  @IsUUID(4)
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
