import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controllers';
import { ArtistService } from './artist.service';
import { InMemoryArtistStorage } from './store/in-memory-artist.storage';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryArtistStorage],
})
export class ArtistModule {}
