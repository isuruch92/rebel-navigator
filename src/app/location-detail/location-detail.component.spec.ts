import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LocationDetailComponent} from './location-detail.component';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

describe('LocationDetailComponent', () => {
  let component: LocationDetailComponent;
  let fixture: ComponentFixture<LocationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LocationDetailComponent],
      providers: [
        {provide: MatDialog, useValue: MatDialog},
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }]
    });
    fixture = TestBed.createComponent(LocationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
