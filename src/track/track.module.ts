import { Module } from '@nestjs/common';
import { TrackController } from './track.controllers';
import { TrackService } from './track.service';
import { InMemoryTrackStorage } from './store/in-memory-track.storage';

@Module({
  controllers: [TrackController],
  providers: [TrackService, InMemoryTrackStorage],
})
export class TrackModule {}
