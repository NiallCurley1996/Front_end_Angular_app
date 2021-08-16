import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './books.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { BookComponent } from './book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { NavComponent } from './nav.component';





var routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'books/:id',
    component: BookComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, BooksComponent, HomeComponent, BookComponent, NavComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
    
  ],
  providers: [WebService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
