import { Component } from '@angular/core';
import { interval, map, merge, mergeAll, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css'],
})
export class MergeComponent {
  a$ = interval(500).pipe(
    map((v) => 'a' + v),
    take(3)
  );
  b$ = interval(500).pipe(
    map((v) => 'b' + v),
    take(3)
  );
  merge$ = merge(this.a$, this.b$).pipe(tap((value) => console.log('merge :',value)));
  mergeAll$ = of(this.a$, this.b$)
    .pipe(mergeAll())
    .subscribe((value) => console.log('mergeAll :',value));
}
