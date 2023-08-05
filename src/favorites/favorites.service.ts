import { Injectable } from '@nestjs/common';
import { InMemoryFavoriteStorage } from './store/in-memory-favorites.storage';
import { FavoritesResponceEntity } from './entities/favorites-response.entity';

@Injectable()
export class FavoritesService {
  constructor(private storage: InMemoryFavoriteStorage) {}

  findAll(): FavoritesResponceEntity {
    return this.storage.findAll();
  }

  addTrack(id: string): boolean {
    return this.storage.addTrack(id);
  }

  addAlbum(id: string): boolean {
    return this.storage.addAlbum(id);
  }

  addArtist(id: string): boolean {
    return this.storage.addArtist(id);
  }

  removeTrack(id: string): boolean {
    return this.storage.removeTrack(id);
  }

  removeAlbum(id: string): boolean {
    return this.storage.removeAlbum(id);
  }

  removeArtist(id: string): boolean {
    return this.storage.removeArtist(id);
  }
}
