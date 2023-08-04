import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

export interface TrackStorage {
  findAll: () => TrackEntity[];
  findOne: (id: string) => TrackEntity | null;
  create: (dto: CreateTrackDto) => TrackEntity;
  update: (id: string, dto: UpdateTrackDto) => TrackEntity;
  remove: (id: string) => boolean;
  clearAlbumId: (id: string) => void;
  clearArtistId: (id: string) => void;
}
