import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryAlbumStorage } from './store/in-memory-album.storage';
import { MessagesResponse } from 'src/const';

@Injectable()
export class AlbumService {
  constructor(private storage: InMemoryAlbumStorage) {}

  create(dto: CreateAlbumDto) {
    return this.storage.create(dto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  update(id: string, dto: UpdateAlbumDto): MessagesResponse | AlbumEntity {
    const album = this.storage.findOne(id);

    if (!album) {
      return MessagesResponse.ALBUM_NOT_FOUND;
    }

    return this.storage.update(id, dto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
