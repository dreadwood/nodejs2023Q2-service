import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

export class FavoritesResponceEntity {
  tracks: Array<TrackEntity | string>;
  albums: AlbumEntity[];
  artists: ArtistEntity[];
}
