import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, debounceTime, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-from-event',
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.css'],
})
export class FromEventComponent implements AfterViewInit {
  @ViewChild('btn') button!: ElementRef;
  form = new FormGroup({
    name: new FormControl('')
  });
  input!: FormControl;
  click$!: Observable<Event>;
  ngAfterViewInit() {
    console.log('NativeElement', this.button);
    this.click$ = fromEvent(this.button.nativeElement, 'click');
    this.click$.pipe(
      tap(() => console.log('click'))
    ).subscribe();
    this.input = this.form.controls['name']
    this.input.valueChanges.pipe(
      debounceTime(500),
      tap((val) => console.log(val)
      )
    ).subscribe();
  }
}
