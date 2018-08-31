import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';

// Interceptors
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './components/shared/shared.module';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { AdminModule } from './components/admin/admin.module';
import { UsersModule } from './components/users/users.module';
import { CoursesModule } from './components/courses/courses.module';
import { FeedbacksModule } from './components/feedbacks/feedbacks.module';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    // Toastr Notifications
    BrowserAnimationsModule, // required by Toastr
    ToastrModule.forRoot(environment.toastr),
    // Modules
    AppRoutingModule, // routing
    SharedModule,
    AuthenticationModule,
    AdminModule,
    UsersModule,
    CoursesModule,
    FeedbacksModule
  ],
  providers: [
    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
