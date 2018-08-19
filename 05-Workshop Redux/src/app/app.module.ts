import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';

// Interceptors
import { TokenInterceptor } from './interceptors/token.interceptor';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// Reducers
import { appReducers } from './store/app.reducers';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    // Store
    StoreModule.forRoot(appReducers), 
    // Modules
    AppRoutingModule, // Routing
    AuthModule,
    RecipeModule,
    // Notifications
    BrowserAnimationsModule, // required by Toastr
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [
    // Interceptors
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
