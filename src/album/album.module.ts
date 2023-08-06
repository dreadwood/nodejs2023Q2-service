import { Module } from '@nestjs/common';
import { AlbumController } from './album.controllers';
import { AlbumService } from './album.service';
import { InMemoryAlbumStorage } from './store/in-memory-album.storage';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, InMemoryAlbumStorage],
})
export class AlbumModule {}
