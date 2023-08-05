import { FavoritesResponceEntity } from '../entities/favorites-response.entity';

export interface FavoritesStorage {
  findAll: () => FavoritesResponceEntity;
  addTrack: (id: string) => boolean;
  addAlbum: (id: string) => boolean;
  addArtist: (id: string) => boolean;
  removeTrack: (id: string) => boolean;
  removeAlbum: (id: string) => boolean;
  removeArtist: (id: string) => boolean;
}
