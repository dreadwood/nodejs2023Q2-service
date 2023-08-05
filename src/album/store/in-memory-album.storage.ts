import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumStorage } from '../interfaces/album-storage.interfaces';
import { AlbumEntity } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { ModuleRef } from '@nestjs/core';
import { InMemoryTrackStorage } from 'src/track/store/in-memory-track.storage';
import { TrackStorage } from 'src/track/interfaces/track-storage.interfaces';
import { FavoritesStorage } from 'src/favorites/interfaces/favorites-storage.interfaces';
import { InMemoryFavoriteStorage } from 'src/favorites/store/in-memory-favorites.storage';

@Injectable()
export class InMemoryAlbumStorage implements AlbumStorage {
  private albums: AlbumEntity[] = [];
  private trackStorage: TrackStorage;
  private favoritesStorage: FavoritesStorage;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.trackStorage = this.moduleRef.get(InMemoryTrackStorage, {
      strict: false,
    });
    this.favoritesStorage = this.moduleRef.get(InMemoryFavoriteStorage, {
      strict: false,
    });
  }

  findAll(): AlbumEntity[] {
    return this.albums;
  }

  findOne(id: string): AlbumEntity | null {
    const album = this.albums.find((album) => album.id === id);

    return album || null;
  }

  create(dto: CreateAlbumDto): AlbumEntity {
    const newAlbum = {
      ...dto,
      id: uuidv4(),
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, dto: UpdateAlbumDto): AlbumEntity {
    const updateIndex = this.albums.findIndex((album) => album.id === id);

    this.albums[updateIndex] = {
      ...this.albums[updateIndex],
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };

    return this.albums[updateIndex];
  }

  remove(id: string): boolean {
    const removeIndex = this.albums.findIndex((album) => album.id === id);

    if (removeIndex === -1) {
      return false;
    }

    this.albums.splice(removeIndex, 1);

    this.trackStorage.clearAlbumId(id);
    this.favoritesStorage.removeAlbum(id);

    return true;
  }

  clearArtistId(id: string): void {
    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }

  exist(id): boolean {
    return this.albums.some((album) => album.id === id);
  }
}
