import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {LocatorMapComponent} from "./locator-map.component";
import {MapService} from "./_service/map.service";
import {MarkerService} from "./_service/marker.service";
import {PopupService} from "./_service/popup.service";
import {DistanceService} from "./_service/distance.service";
import {StateService} from "../_service/state/state.service";
import {combineLatest, Observable, of, Subject} from "rxjs";
import {EntityService} from "../_service/entity/entity.service";
import {ErrorHandlerService} from "../_service/error-handler/error-handler.service";

const mockMapService = {
  initMap: jasmine.createSpy('initMap').and.returnValue({} as any),
  createVectorSource: jasmine.createSpy('createVectorSource').and.returnValue({
    addFeatures: () => {
    }
  } as any),
  createVectorLayer: jasmine.createSpy('createVectorLayer').and.returnValue({
    setSource: () => {
    }
  } as any),
  addLayer: jasmine.createSpy('addLayer'),
  createOverlay: jasmine.createSpy('createOverlay').and.returnValue({} as any),
  addOverlay: jasmine.createSpy('addOverlay'),
  updateMap: jasmine.createSpy('updateMap'),
  mapClickSubject: new Subject<any>(),
  get mapClick$(): Observable<any> {
    return this.mapClickSubject.asObservable();
  },
  mapHoverSubject: new Subject<any>(),
  get mapHover$(): Observable<any> {
    return combineLatest([this.mapHoverSubject.asObservable(), of([])]);
  },
};

const mockMarkerService = {
  generateMarkerFeatures: jasmine.createSpy('generateMarkerFeatures').and.returnValue([]),
  removeCurrentMarker: jasmine.createSpy('removeCurrentMarker'),
  createMarkerFeature: jasmine.createSpy('createMarkerFeature').and.returnValue({} as any),
  setCurrentMarker: jasmine.createSpy('setCurrentMarker'),
};

const mockPopupService = {
  getPopupOptions: jasmine.createSpy('getPopupOptions').and.returnValue({}),
  setPopup: jasmine.createSpy('setPopup'),
  getPopup: jasmine.createSpy('getPopup').and.returnValue({}),
  showPopup: jasmine.createSpy('showPopup'),
  hidePopup: jasmine.createSpy('hidePopup'),
};

const mockDistanceService = {
  calculateDistanceOfMarkers: jasmine.createSpy('calculateDistanceOfMarkers'),
  sortMarkersByDistance: jasmine.createSpy('sortMarkersByDistance').and.returnValue([]),
};

const mockStateService = {
  emitSortedMarkers: jasmine.createSpy('emitSortedMarkers'),
};

describe('LocatorMapComponent', () => {
  let component: LocatorMapComponent;
  let fixture: ComponentFixture<LocatorMapComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [LocatorMapComponent],
        providers: [
          {provide: MapService, useValue: mockMapService},
          {provide: MarkerService, useValue: mockMarkerService},
          {provide: PopupService, useValue: mockPopupService},
          {provide: DistanceService, useValue: mockDistanceService},
          {provide: StateService, useValue: mockStateService},
          {provide: EntityService, useValue: EntityService},
          {provide: ErrorHandlerService, useValue: ErrorHandlerService},
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initMap on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(mockMapService.initMap).toHaveBeenCalled();
  });

  it('should call addMarkers and addPopup on ngAfterViewInit', () => {
    spyOn(component as any, 'addMarkers');
    spyOn(component as any, 'addPopup');

    component.ngAfterViewInit();

    expect((component as any).addMarkers).toHaveBeenCalled();
    expect((component as any).addPopup).toHaveBeenCalled();
  });

  it('should call handleMapClick whenever mapClick$ event fires', () => {
    const mockEvent = {
      longitude: 33.91402426590539,
      latitude: 20.565141850353726,
      clickedCoords: [
        3775291.9120313115,
        2340101.291027086
      ]
    };

    const mapClickSubject = new Subject<any>();
    spyOnProperty(mockMapService, 'mapClick$').and.returnValue(mockMapService.mapClick$);

    component.mapClick$.subscribe(() => {
      expect((component as any).handleMapClick).toHaveBeenCalledWith(<any>mockEvent);
      expect(mockMarkerService.removeCurrentMarker).toHaveBeenCalled();
      expect(mockMarkerService.createMarkerFeature).toHaveBeenCalled();
      expect(mockMarkerService.setCurrentMarker).toHaveBeenCalled();
      expect(mockDistanceService.calculateDistanceOfMarkers).toHaveBeenCalled();
      expect(mockStateService.emitSortedMarkers).toHaveBeenCalled();
    });

    mapClickSubject.next(mockEvent);
  });

  it('should call updateMap on window resize', () => {
    spyOn(component as any, 'onWindowResize');
    window.dispatchEvent(new Event('resize'));
    expect((component as any).onWindowResize).toHaveBeenCalled();
  });
});
