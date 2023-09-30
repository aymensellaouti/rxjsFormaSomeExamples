import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Spy, provideAutoSpy } from "jasmine-auto-spies";
import { CvComponent } from "./cv.component";
import { CvService } from "../services/cv.service";
import { HttpClientModule } from "@angular/common/http";
import { Cv } from "../model/cv";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { subscribeSpyTo } from "@hirez_io/observer-spy";
// import { ToastrModule, ToastrService } from 'ngx-toastr';

fdescribe("CvComponent", () => {
  let component: CvComponent;
  let cvServiceSpy: Spy<CvService>;
  let cvComponentSpy: Spy<CvService>;
  let fixture: ComponentFixture<CvComponent>;
  let fakeCvs: Cv[];
  let fakeFakeCvs: Cv[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvComponent],
      imports: [HttpClientModule],
      // To avoid errors caused by children components
      schemas: [NO_ERRORS_SCHEMA],
      // Automatically create a spy with all functions available
      providers: [provideAutoSpy(CvService)],
    }).compileComponents();
    cvServiceSpy = TestBed.inject<any>(CvService);
    fakeCvs = [
      new Cv(1, "aymen", "sellaouti", "teacher", "as.jpg", "1234", 40),
      // new Cv(2, "skander", "sellaouti", "enfant", "       ", "1234", 4),
    ];
    fakeFakeCvs =[
       new Cv(1, 'aymen', 'sellaouti', 'teacher', 'as.jpg', '1234', 40),
       new Cv(2, 'skander', 'sellaouti', 'enfant', '       ', '1234', 4),
    ]
    // console.log(fakeCvs);
    // cvServiceSpy.getCvs.and.nextWith(fakeCvs);
    fixture = TestBed.createComponent(CvComponent);
    //component = TestBed.inject(CvComponent);
    component = fixture.componentInstance;
    cvServiceSpy = TestBed.inject<any>(CvService);
    // fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return the list of cvs", () => {
    // Arrange (Fake Inputs)
    cvServiceSpy.getCvs.and.nextWith(fakeCvs);
    // component.getCvs().subscribe((cvs) => {
    //   // console.log(cvs);
    //   // console.log(fakeCvs);
    //   console.log("here");

    //   expect(cvs.length).toEqual(fakeCvs.length);
    // });
    const observerSpy = subscribeSpyTo(component.getCvs())
    console.log(observerSpy.getLastValue());
    expect(observerSpy.getLastValue()).toEqual(fakeCvs);
  });
  it('should return the fake list of cvs', () => {
    // Arrange (Fake Inputs)
    cvServiceSpy.getCvs.and.throwWith(new Error('fake list of cvs'));
    cvServiceSpy.getFakeCvs.and.callFake(CvService.prototype.getFakeCvs);
    // cvServiceSpy.getFakeCvs.and.returnValue([
    //   new Cv(1, 'aymen', 'sellaouti', 'teacher', 'as.jpg', '1234', 40),
    //   new Cv(2, 'skander', 'sellaouti', 'enfant', '       ', '1234', 4),
    // ]);
    // component.getCvs().subscribe((cvs) => {
    //   // console.log(cvs);
    //   // console.log(fakeCvs);
    //   console.log("here");

    //   expect(cvs.length).toEqual(fakeCvs.length);
    // });
    const observerSpy = subscribeSpyTo(component.getCvs(), {expectErrors: true});
    // await observerSpy.onError();
    // expect(observerSpy.receivedError()).toBe(true);
    // console.log(observerSpy.getError());
    // console.log({lastvaluee: observerSpy.expectErrors().getLastValue()});

    expect(observerSpy.expectErrors().getLastValue()).toEqual(fakeFakeCvs);
  });
});
