import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TrackStorage } from '../interfaces/track-storage.interfaces';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { InMemoryFavoriteStorage } from 'src/favorites/store/in-memory-favorites.storage';
import { FavoritesStorage } from 'src/favorites/interfaces/favorites-storage.interfaces';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class InMemoryTrackStorage implements TrackStorage {
  private tracks: TrackEntity[] = [];
  private favoritesStorage: FavoritesStorage;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.favoritesStorage = this.moduleRef.get(InMemoryFavoriteStorage, {
      strict: false,
    });
  }

  findAll(): TrackEntity[] {
    return this.tracks;
  }

  findOne(id: string): TrackEntity | null {
    const track = this.tracks.find((track) => track.id === id);

    return track || null;
  }

  create(dto: CreateTrackDto): TrackEntity {
    const newTrack = {
      ...dto,
      id: uuidv4(),
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, dto: UpdateTrackDto): TrackEntity {
    const updateIndex = this.tracks.findIndex((track) => track.id === id);

    this.tracks[updateIndex] = {
      ...this.tracks[updateIndex],
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };

    return this.tracks[updateIndex];
  }

  remove(id: string): boolean {
    const removeIndex = this.tracks.findIndex((track) => track.id === id);

    if (removeIndex === -1) {
      return false;
    }

    this.tracks.splice(removeIndex, 1);

    this.favoritesStorage.removeTrack(id);

    return true;
  }

  clearAlbumId(id: string): void {
    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }

  clearArtistId(id: string): void {
    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }

  exist(id): boolean {
    return this.tracks.some((track) => track.id === id);
  }
}
