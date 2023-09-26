import { Component } from '@angular/core';
import { Subject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css'],
})
export class CombineLatestComponent {
  stream1$ = new Subject<number>();
  stream2$ = new Subject<number>();
  stream3$ = new Subject<number>();
  index = 0;
  streams = [this.stream1$, this.stream2$, this.stream3$];
  vm$ = combineLatest(this.streams).pipe(
    map(([stream1, stream2, stream3]) => ({ stream1, stream2, stream3 }))
  );
  triggerSubject(index: number) {
    // console.log(this.streams[index]);
    console.log(index);
    this.streams[index % 3].next(index);
  }
}
