import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { MessagesResponse } from 'src/const';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException(MessagesResponse.ALBUM_NOT_FOUND);
    }

    return album;
  }

  @Post()
  create(@Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    const updateValue = this.albumService.update(id, dto);

    if (typeof updateValue !== 'string') {
      return updateValue;
    }

    switch (updateValue) {
      case MessagesResponse.ALBUM_NOT_FOUND:
        throw new NotFoundException(MessagesResponse.ALBUM_NOT_FOUND);

      default:
        throw new InternalServerErrorException(
          MessagesResponse.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const album = this.albumService.remove(id);

    if (!album) {
      throw new NotFoundException(MessagesResponse.ALBUM_NOT_FOUND);
    }
  }
}
