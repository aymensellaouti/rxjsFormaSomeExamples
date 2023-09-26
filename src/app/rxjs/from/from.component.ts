import { Component } from '@angular/core';
import { Observable, from, tap } from 'rxjs';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.css']
})
export class FromComponent {
  from$: Observable<any>;
  constructor() {
    this.from$ = from([1, {name: 'aymen'}, 3]).pipe(tap((data) => console.log(data)))
    this.from$.subscribe({
      next: (value: any) => console.log(value),
      complete: () => console.log('complete'),
    });
    console.log('Are you asynchronous');
  }
}
