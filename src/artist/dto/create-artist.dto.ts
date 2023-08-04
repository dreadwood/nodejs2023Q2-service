import { OmitType } from '@nestjs/mapped-types';
import { ArtistEntity } from '../entities/artist.entity';

export class CreateArtistDto extends OmitType(ArtistEntity, ['id'] as const) {}
