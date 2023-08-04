import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistStorage {
  findAll: () => ArtistEntity[];
  findOne: (id: string) => ArtistEntity | null;
  create: (dto: CreateArtistDto) => ArtistEntity;
  update: (id: string, dto: UpdateArtistDto) => ArtistEntity;
  remove: (id: string) => boolean;
}
