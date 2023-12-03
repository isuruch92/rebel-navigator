import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LocatorDashboardComponent} from './locator-dashboard.component';
import {StateService} from "../_service/state/state.service";
import {EntityService} from "../_service/entity/entity.service";
import {MessageDecoderService} from "../_service/message-decoder/message-decoder.service";
import {of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

const mockStateService = {
  sortedMarkers$: of([{id: 1, lat: 100, long: 200}]),
};

const mockEntityService = {
  entities$: of([{id: 1, name: 'Entity 1'}]),
};

const mockMessageDecoderService = {
  decodedMessage$: of([{id: 1, lat: 100, long: 200}]),
};

describe('LocatorDashboardComponent', () => {
  let component: LocatorDashboardComponent;
  let fixture: ComponentFixture<LocatorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocatorDashboardComponent],
      providers: [
        {provide: StateService, useValue: mockStateService},
        {provide: EntityService, useValue: mockEntityService},
        {provide: MessageDecoderService, useValue: mockMessageDecoderService},
        {provide: MatDialog, useValue: MatDialog},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have decodedMessage$ and locationList$', () => {
    expect(component.decodedMessage$).toBeDefined();
    expect(component.locationList$).toBeDefined();
  });
});
