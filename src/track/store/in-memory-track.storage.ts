import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TrackStorage } from '../interfaces/track-storage.interfaces';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class InMemoryTrackStorage implements TrackStorage {
  private tracks: TrackEntity[] = [];

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

    this.tracks = [
      ...this.tracks.slice(0, removeIndex),
      ...this.tracks.slice(removeIndex + 1),
    ];

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
}
