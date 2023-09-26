import { Component, Input } from '@angular/core';
import { Observable, combineLatest, map, tap, timer } from 'rxjs';
export interface Image {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input() images: string[] = [];
  @Input() timer = 5000;
  @Input() size = 150;
  @Input() images$!: Observable<Image[]>;
  slider$!: Observable<string>;
  constructor() {
    // this.images$ = this.http.get<Image[]>(
    //   'https://jsonplaceholder.typicode.com/photos'
    // );
  }
  ngOnInit() {
    if (this.images$)
      this.slider$ = combineLatest([timer(0, this.timer), this.images$]).pipe(
      tap(([index, images]) => console.log({ index, images })),
      map(([index, images]) => images[index % (images.length - 1)].url)
    // tap((path) => console.log({ path }))
  );}
}
