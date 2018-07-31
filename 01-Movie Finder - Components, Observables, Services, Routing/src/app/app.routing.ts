import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  // NB: no "/" in routes
  { path: '', component: MoviesComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: MoviesComponent }
];

const routing: ModuleWithProviders = RouterModule.forRoot(routes);
export { routing };
