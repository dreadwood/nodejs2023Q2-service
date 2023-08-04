import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ArtistStorage } from '../interfaces/artist-storage.interfaces';
import { ArtistEntity } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { TrackStorage } from 'src/track/interfaces/track-storage.interfaces';
import { AlbumStorage } from 'src/album/interfaces/album-storage.interfaces';
import { ModuleRef } from '@nestjs/core';
import { InMemoryAlbumStorage } from 'src/album/store/in-memory-album.storage';
import { InMemoryTrackStorage } from 'src/track/store/in-memory-track.storage';

@Injectable()
export class InMemoryArtistStorage implements ArtistStorage {
  private artists: ArtistEntity[] = [];
  private albumStorage: AlbumStorage;
  private trackStorage: TrackStorage;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.albumStorage = this.moduleRef.get(InMemoryAlbumStorage, {
      strict: false,
    });
    this.trackStorage = this.moduleRef.get(InMemoryTrackStorage, {
      strict: false,
    });
  }

  findAll(): ArtistEntity[] {
    return this.artists;
  }

  findOne(id: string): ArtistEntity | null {
    const artist = this.artists.find((artist) => artist.id === id);

    return artist || null;
  }

  create(dto: CreateArtistDto): ArtistEntity {
    const newArtist = {
      ...dto,
      id: uuidv4(),
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, dto: UpdateArtistDto): ArtistEntity {
    const updateIndex = this.artists.findIndex((artist) => artist.id === id);

    this.artists[updateIndex] = {
      ...this.artists[updateIndex],
      name: dto.name,
      grammy: dto.grammy,
    };

    return this.artists[updateIndex];
  }

  remove(id: string): boolean {
    const removeIndex = this.artists.findIndex((artist) => artist.id === id);

    if (removeIndex === -1) {
      return false;
    }

    this.artists = [
      ...this.artists.slice(0, removeIndex),
      ...this.artists.slice(removeIndex + 1),
    ];

    this.albumStorage.clearArtistId(id);
    this.trackStorage.clearArtistId(id);

    return true;
  }
}
