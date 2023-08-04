import { Injectable } from '@nestjs/common';
import { TrackEntity } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryTrackStorage } from './store/in-memory-track.storage';
import { MessagesResponse } from 'src/const';

@Injectable()
export class TrackService {
  constructor(private storage: InMemoryTrackStorage) {}

  create(dto: CreateTrackDto) {
    return this.storage.create(dto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  update(id: string, dto: UpdateTrackDto): MessagesResponse | TrackEntity {
    const track = this.storage.findOne(id);

    if (!track) {
      return MessagesResponse.TRACK_NOT_FOUND;
    }

    return this.storage.update(id, dto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
