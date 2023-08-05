import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controllers';
import { InMemoryFavoriteStorage } from './store/in-memory-favorites.storage';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryFavoriteStorage],
})
export class FavoritesModule {}
