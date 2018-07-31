import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieDetails } from '../models/movie-details.model';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  @Input('movie') movie: MovieDetails;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const { id } = params;

      this.movieService.getMovie(id).subscribe(data => {
        // console.log(data);
        this.movie = data;
      });
    });
  }
}
