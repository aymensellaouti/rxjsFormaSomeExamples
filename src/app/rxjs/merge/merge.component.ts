import { Component } from '@angular/core';
import { interval, map, merge, take } from 'rxjs';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent {
 a$ = interval(500).pipe(map((v) => 'a' + v), take(3));
 b$ = interval(500).pipe(map((v) => 'b' + v), take(3));
 merge$ = merge(this.a$, this.b$).subscribe((value) => console.log(value));
}
