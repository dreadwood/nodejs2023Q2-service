import { OmitType } from '@nestjs/mapped-types';
import { AlbumEntity } from '../entities/album.entity';

export class CreateAlbumDto extends OmitType(AlbumEntity, ['id'] as const) {}
