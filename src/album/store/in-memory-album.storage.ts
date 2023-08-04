import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AlbumStorage } from '../interfaces/album-storage.interfaces';
import { AlbumEntity } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class InMemoryAlbumStorage implements AlbumStorage {
  private albums: AlbumEntity[] = [];

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

    this.albums = [
      ...this.albums.slice(0, removeIndex),
      ...this.albums.slice(removeIndex + 1),
    ];

    return true;
  }
}
