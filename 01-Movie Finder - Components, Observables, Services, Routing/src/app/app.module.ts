import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // NB!
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AboutComponent } from './about/about.component';

import { MoviesService } from './services/movies.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MoviesComponent,
    MovieComponent,
    MovieDetailsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
    // RouterModule.forRoot([
    // { path: '', component: MoviesComponent },
    // { path: 'movie/:id', component: MovieDetailsComponent },
    // { path: 'about', component: AboutComponent },
    // { path: '**', component: MoviesComponent }
    // ])
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
