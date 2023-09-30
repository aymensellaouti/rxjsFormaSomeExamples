import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Spy, provideAutoSpy } from "jasmine-auto-spies";
import { CvComponent } from "./cv.component";
import { CvService } from "../services/cv.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Cv } from "../model/cv";
import { NO_ERRORS_SCHEMA } from "@angular/core";
// import { ToastrModule, ToastrService } from 'ngx-toastr';

fdescribe("CvComponent", () => {
  let component: CvComponent;
  let cvServiceSpy: Spy<CvService>;
  let fixture: ComponentFixture<CvComponent>;
  let fakeCvs: Cv[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvComponent],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideAutoSpy(CvService)],
    }).compileComponents();
    cvServiceSpy = TestBed.inject<any>(CvService);
    fakeCvs = [
      new Cv(1, "aymen", "sellaouti", "teacher", "as.jpg", "1234", 40),
      // new Cv(2, "skander", "sellaouti", "enfant", "       ", "1234", 4),
    ];
    // console.log(fakeCvs);
    cvServiceSpy.getCvs.and.nextWith(fakeCvs);
    fixture = TestBed.createComponent(CvComponent);
    //component = TestBed.inject(CvComponent);
    component = fixture.componentInstance;

    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return the list of cvs", () => {
    // Arrange (Fake Inputs)
    cvServiceSpy.getCvs.and.nextWith(fakeCvs);
    component.getCvs().subscribe((cvs) => {
      // console.log(cvs);
      // console.log(fakeCvs);
      console.log("here");

      expect(cvs.length).toEqual(fakeCvs.length);
    });
  });
});
