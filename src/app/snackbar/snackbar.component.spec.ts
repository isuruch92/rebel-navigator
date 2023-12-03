import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SnackbarComponent} from './snackbar.component';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {SnackBarType} from "../_model/snackbar.model";

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SnackbarComponent],
      providers: [
        {
          provide: MatSnackBarRef,
          useValue: {}
        },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {
            message: 'Test message',
            type: SnackBarType.SUCCESS,
            duration: 3000
          }
        }
      ]
    });
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct data', () => {
    expect(component.snackBarRef).toBeDefined();
    expect(component.data.message).toBe('Test message');
    expect(component.data.type).toBe(SnackBarType.SUCCESS);
  });
});
