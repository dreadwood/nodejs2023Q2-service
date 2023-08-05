export const DEFAULT_PORT = 4000;
export const DEFAULT_VERSION_USER = 1;

export enum MessagesResponse {
  USER_NOT_FOUND = 'User not found',
  ARTIST_NOT_FOUND = 'Artist not found',
  ARTIST_NOT_FAVORITE = 'Artist is not a favorite',
  ALBUM_NOT_FOUND = 'Album not found',
  ALBUM_NOT_FAVORITE = 'Album is not a favorite',
  TRACK_NOT_FOUND = 'Track not found',
  TRACK_NOT_FAVORITE = 'Track is not a favorite',
  PASSWORD_WRONG = 'Old password is wrong',
  INTERNAL_SERVER_ERROR = 'Internal server error',
}
