import { Genre } from './genre.model';

export interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  homepage: string;
  genres: Array<Genre>;
}
