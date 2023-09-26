import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Image } from './rxjs/slider/slider.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  images$!: Observable<Image[]>;
  title = 'Starting Advanced Topics';
  constructor(private http: HttpClient) {
    this.images$ = this.http.get<Image[]>(
      'https://jsonplaceholder.typicode.com/photos'
    );
  }
}
