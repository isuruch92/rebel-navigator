import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {StateService} from "./_service/state/state.service";
import {OverlayContainer} from "@angular/cdk/overlay";
import {By} from "@angular/platform-browser";
import {MatSidenavContainer} from "@angular/material/sidenav";
import {of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let stateService: StateService;
  let overlayContainer: OverlayContainer;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: StateService, useClass: StateService},
        OverlayContainer,
        MatSnackBar
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    stateService = TestBed.inject(StateService);
    overlayContainer = TestBed.inject(OverlayContainer);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a MatSidenavContainer', () => {
    const sidenavContainer = fixture.debugElement.query(By.directive(MatSidenavContainer));
    expect(sidenavContainer).toBeTruthy();
  });

  it('should update className on handleThemeChange', () => {
    (component as any).handleThemeChange(true);
    expect(component.className).toEqual('theme-dark');

    (component as any).handleThemeChange(false);
    expect(component.className).toEqual('theme-light');
  });

  it('should toggle theme when toggleChange$ emits', () => {
    spyOn(stateService.themeToggle$, 'pipe').and.returnValue(
      of(true)
    );

    spyOn(component as any, 'handleThemeChange').and.callThrough();

    stateService.emitThemeToggle(true);

    expect((component as any).handleThemeChange).toHaveBeenCalledWith(true);
  });


});
