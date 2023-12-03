import {TestBed} from '@angular/core/testing';

import {StateService} from './state.service';
import {Marker} from "../../_model/marker.model";

describe('StateService', () => {
  let service: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should broadcast sorted markers state', () => {
    const mockMarkersValues: Marker[] = [
      {id: 1, lat: 100, long: 200},
      {id: 2, lat: 500, long: 600},
    ];

    let emittedMarkers: Marker[] = [];

    service.sortedMarkers$.subscribe((markers) => {
      emittedMarkers = markers;
    });

    service.emitSortedMarkers(mockMarkersValues);

    expect(emittedMarkers).toEqual(mockMarkersValues);
  });

  it('should broadcast theme toggle state', () => {
    const mockValue = true;
    let emittedValue = false;

    service.themeToggle$.subscribe((value) => {
      emittedValue = value;
    });

    service.emitThemeToggle(mockValue);

    expect(emittedValue).toEqual(mockValue);
  });
});
