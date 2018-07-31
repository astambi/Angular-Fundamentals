import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movies } from '../models/movies-list.model';
import { MovieDetails } from '../models/movie-details.model';

const apiKey = 'a86e92287239b6ba4f230a63447a79db';
const path = 'https://api.themoviedb.org/3/';
const authentication = '&api_key=';
const authMovie = '?api_key=';
const movie = 'movie/';
const searchMovie = 'search/movie?query=';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  popular: string = 'discover/movie?sort_by=popularity.desc';
  theaters: string;
  kids: string = `discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc`;
  dramas: string = `discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10`;

  constructor(private httpClient: HttpClient) {
    this.init();
  }

  init() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth === 0) {
      prevYear = year - 1;
      prevMonth = 11;
    }

    const startDate = `${prevYear}-${prevMonth}-${date}`;
    const endDate = `${year}-${month}-${date}`;

    this.theaters = `discover/movie?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`;
  }

  findMovie(searchTerm: string): Observable<Movies> {
    const queryStr = `${path}${searchMovie}${searchTerm}${authentication}${apiKey}`;
    return this.httpClient.get<Movies>(queryStr);
  }

  getMovie(id: number): Observable<MovieDetails> {
    const queryStr = `${path}${movie}${id}${authMovie}${apiKey}`;
    return this.httpClient.get<MovieDetails>(queryStr);
  }

  getDramas(): Observable<Movies> {
    return this.getMovies(this.dramas);
  }

  getKids(): Observable<Movies> {
    return this.getMovies(this.kids);
  }

  getPopular(): Observable<Movies> {
    return this.getMovies(this.popular);
  }

  getTheaters(): Observable<Movies> {
    return this.getMovies(this.theaters);
  }

  getMovies(param: string): Observable<Movies> {
    const queryStr = `${path}${param}${authentication}${apiKey}`;
    return this.httpClient.get<Movies>(queryStr);
  }
}
