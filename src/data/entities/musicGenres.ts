import { MusicGenreEntity } from '../../data/types';

export const MUSIC_GENRES: Record<string, MusicGenreEntity> = {
  'funk': { id: 'funk', nameKey: 'musicGenres.funk.name', descriptionKey: 'musicGenres.funk.description' },
  'soul': { id: 'soul', nameKey: 'musicGenres.soul.name' },
};

export const MUSIC_GENRES_LIST: MusicGenreEntity[] = Object.values(MUSIC_GENRES);

export const getMusicGenreById = (id: string): MusicGenreEntity | undefined => {
  return MUSIC_GENRES[id];
};

export const getAllMusicGenres = () => MUSIC_GENRES_LIST;
