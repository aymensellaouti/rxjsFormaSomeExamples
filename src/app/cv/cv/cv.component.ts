import { Component, OnInit } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { Observable, catchError, ignoreElements, of, startWith } from "rxjs";
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent implements OnInit {
  cvs$!: Observable<Cv[]>;
  selectedCv: Cv | null = null;
  date = new Date();

  constructor(
    private logger: LoggerService,
    // private toastr: ToastrService,
    private cvService: CvService
  ) {
    // this.toastr.info('Bienvenu dans notre CvTech');
  }
  ngOnInit(): void {
     this.cvs$ = this.getCvs();
  }
  getCvs(): Observable<Cv[]> {
    return this.cvService.getCvs().pipe(
      // ignoreElements(),
      // startWith([]),
      catchError((error) => of(this.cvService.getFakeCvs()))
    );
  }
  getSelectedCv(cv: Cv) {
    this.selectedCv = cv;
  }
}
