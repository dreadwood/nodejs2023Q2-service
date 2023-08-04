import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class TrackEntity {
  @IsUUID(4)
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null; // TODO: refers to Artist

  @IsString()
  @IsOptional()
  albumId: string | null; // TODO: refers to Album

  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
