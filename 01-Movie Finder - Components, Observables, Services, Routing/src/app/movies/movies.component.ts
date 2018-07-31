import { Component, OnInit } from '@angular/core';

import { Movie } from '../models/movie.model';
import { Search } from '../models/search.model';

import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  maxCount: number = 6;
  popular: Array<Movie>;
  theaters: Array<Movie>;
  kids: Array<Movie>;
  dramas: Array<Movie>;
  searchMatch: Array<Movie>;
  isSearch: boolean = false;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getPopular().subscribe(data => {
      this.popular = data.results
        .slice(0, this.maxCount)
        .map(obj => this.mapMovie(obj));
    });

    this.movieService.getTheaters().subscribe(data => {
      this.theaters = data.results
        .slice(0, this.maxCount)
        .map(obj => this.mapMovie(obj));
    });

    this.movieService.getKids().subscribe(data => {
      this.kids = data.results
        .slice(0, this.maxCount)
        .map(obj => this.mapMovie(obj));
    });

    this.movieService.getDramas().subscribe(data => {
      this.dramas = data.results
        .slice(0, this.maxCount)
        .map(obj => this.mapMovie(obj));
    });
  }

  search(searchObj: Search) {
    const searchTerm = searchObj.search.trim();
    if (!searchTerm) {
      this.isSearch = false;
      return;
    }

    this.movieService.findMovie(searchTerm).subscribe(data => {
      this.searchMatch = data.results
        .slice(0, this.maxCount)
        .map(obj => this.mapMovie(obj));
      this.isSearch = true;
    });
  }

  mapMovie(movieObj: Movie): Movie {
    const { id, title, release_date, poster_path } = movieObj;
    return { id, title, release_date, poster_path };
  }
}
