import { Injectable } from '@nestjs/common';
import { FavoritesStorage } from '../interfaces/favorites-storage.interfaces';
import { InMemoryTrackStorage } from 'src/track/store/in-memory-track.storage';
import { ModuleRef } from '@nestjs/core';
import { AlbumStorage } from 'src/album/interfaces/album-storage.interfaces';
import { TrackStorage } from 'src/track/interfaces/track-storage.interfaces';
import { InMemoryAlbumStorage } from 'src/album/store/in-memory-album.storage';
import { InMemoryArtistStorage } from 'src/artist/store/in-memory-artist.storage';
import { ArtistStorage } from 'src/artist/interfaces/artist-storage.interfaces';
import { FavoritesEntity } from '../entities/favorites.entity';
import { FavoritesResponceEntity } from '../entities/favorites-response.entity';

// TODO: 2023-08-04 / проверка, что элемент уже добавлен?

@Injectable()
export class InMemoryFavoriteStorage implements FavoritesStorage {
  private favorites: FavoritesEntity = new FavoritesEntity();
  private trackStorage: TrackStorage;
  private albumStorage: AlbumStorage;
  private artistStorage: ArtistStorage;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.trackStorage = this.moduleRef.get(InMemoryTrackStorage, {
      strict: false,
    });
    this.albumStorage = this.moduleRef.get(InMemoryAlbumStorage, {
      strict: false,
    });
    this.artistStorage = this.moduleRef.get(InMemoryArtistStorage, {
      strict: false,
    });
  }

  findAll(): FavoritesResponceEntity {
    const tracks = this.favorites.tracks.map((trackId) =>
      this.trackStorage.findOne(trackId),
    );
    const albums = this.favorites.albums.map((albumId) =>
      this.albumStorage.findOne(albumId),
    );
    const artists = this.favorites.artists.map((artistId) =>
      this.artistStorage.findOne(artistId),
    );
    return {
      tracks,
      albums,
      artists,
    };
  }

  addTrack(id: string): boolean {
    return this.add(id, this.trackStorage, this.favorites.tracks);
  }

  addAlbum(id: string): boolean {
    return this.add(id, this.albumStorage, this.favorites.albums);
  }

  addArtist(id: string): boolean {
    return this.add(id, this.artistStorage, this.favorites.artists);
  }

  removeTrack(id: string): boolean {
    return this.remove(id, this.favorites.tracks);
  }

  removeAlbum(id: string): boolean {
    return this.remove(id, this.favorites.albums);
  }

  removeArtist(id: string): boolean {
    return this.remove(id, this.favorites.artists);
  }

  private add(
    id: string,
    storage: TrackStorage | AlbumStorage | ArtistStorage,
    favoriteType: string[],
  ) {
    const isExist = storage.exist(id);

    if (isExist) {
      favoriteType.push(id);
    }

    return isExist;
  }

  private remove(id: string, favoriteType: string[]): boolean {
    const removeIndex = favoriteType.findIndex((itemId) => itemId === id);

    if (removeIndex === -1) {
      return false;
    }

    favoriteType.splice(removeIndex, 1);

    return true;
  }
}
