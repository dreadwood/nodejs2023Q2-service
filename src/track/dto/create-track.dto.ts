import { OmitType } from '@nestjs/mapped-types';
import { TrackEntity } from '../entities/track.entity';

export class CreateTrackDto extends OmitType(TrackEntity, ['id'] as const) {}
