import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MessagesResponse } from 'src/const';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const result = this.favoritesService.addTrack(id);

    if (!result) {
      throw new UnprocessableEntityException(MessagesResponse.TRACK_NOT_FOUND);
    }
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const result = this.favoritesService.addAlbum(id);

    if (!result) {
      throw new UnprocessableEntityException(MessagesResponse.ALBUM_NOT_FOUND);
    }
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const result = this.favoritesService.addArtist(id);

    if (!result) {
      throw new UnprocessableEntityException(MessagesResponse.ARTIST_NOT_FOUND);
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const result = this.favoritesService.removeTrack(id);

    if (!result) {
      throw new NotFoundException(MessagesResponse.ARTIST_NOT_FAVORITE);
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const result = this.favoritesService.removeAlbum(id);

    if (!result) {
      throw new NotFoundException(MessagesResponse.ARTIST_NOT_FAVORITE);
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const result = this.favoritesService.removeArtist(id);

    if (!result) {
      throw new NotFoundException(MessagesResponse.ARTIST_NOT_FAVORITE);
    }
  }
}
