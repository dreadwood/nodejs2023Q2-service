import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}
// TODO: 2023-08-04 / убрать id
// TODO: 2023-08-04 / узнать что будет если передавать не те параметры или частично
