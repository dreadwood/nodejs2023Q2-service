import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { InMemoryArtistStorage } from './store/in-memory-artist.storage';
import { MessagesResponse } from 'src/const';

@Injectable()
export class ArtistService {
  constructor(private storage: InMemoryArtistStorage) {}

  create(dto: CreateArtistDto) {
    return this.storage.create(dto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  update(id: string, dto: UpdateArtistDto): MessagesResponse | ArtistEntity {
    const atrist = this.storage.findOne(id);

    if (!atrist) {
      return MessagesResponse.ARTIST_NOT_FOUND;
    }

    return this.storage.update(id, dto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
