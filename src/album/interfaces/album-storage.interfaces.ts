import { AlbumEntity } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export interface AlbumStorage {
  findAll: () => AlbumEntity[];
  findOne: (id: string) => AlbumEntity | null;
  create: (dto: CreateAlbumDto) => AlbumEntity;
  update: (id: string, dto: UpdateAlbumDto) => AlbumEntity;
  remove: (id: string) => boolean;
}
