import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationItemComponent } from './location-item.component';
import {MatDialog} from "@angular/material/dialog";

describe('LocationItemComponent', () => {
  let component: LocationItemComponent;
  let fixture: ComponentFixture<LocationItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LocationItemComponent],
      providers: [{provide: MatDialog, useValue: MatDialog},]
    });
    fixture = TestBed.createComponent(LocationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
