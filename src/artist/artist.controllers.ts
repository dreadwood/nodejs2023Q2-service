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
import { ArtistService } from './artist.service';
import { MessagesResponse } from 'src/const';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException(MessagesResponse.ARTIST_NOT_FOUND);
    }

    return artist;
  }

  @Post()
  create(@Body() dto: CreateArtistDto) {
    return this.artistService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    const updateValue = this.artistService.update(id, dto);

    if (typeof updateValue !== 'string') {
      return updateValue;
    }

    switch (updateValue) {
      case MessagesResponse.ARTIST_NOT_FOUND:
        throw new NotFoundException(MessagesResponse.ARTIST_NOT_FOUND);

      default:
        throw new InternalServerErrorException(
          MessagesResponse.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.artistService.remove(id);

    if (!artist) {
      throw new NotFoundException(MessagesResponse.ARTIST_NOT_FOUND);
    }
  }
}
