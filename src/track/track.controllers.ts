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
import { MessagesResponse } from 'src/const';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException(MessagesResponse.TRACK_NOT_FOUND);
    }

    return track;
  }

  @Post()
  create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    const updateValue = this.trackService.update(id, dto);

    if (typeof updateValue !== 'string') {
      return updateValue;
    }

    switch (updateValue) {
      case MessagesResponse.TRACK_NOT_FOUND:
        throw new NotFoundException(MessagesResponse.TRACK_NOT_FOUND);

      default:
        throw new InternalServerErrorException(
          MessagesResponse.INTERNAL_SERVER_ERROR,
        );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = this.trackService.remove(id);

    if (!track) {
      throw new NotFoundException(MessagesResponse.TRACK_NOT_FOUND);
    }
  }
}
