import {TestBed} from '@angular/core/testing';

import {MapService} from './map.service';

describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the map', () => {
    const map = service.initMap();
    expect(map).toBeDefined();
  });

  it('should create a vector layer', () => {
    const layer = service.createVectorLayer();
    expect(layer).toBeDefined();
  });

  it('should add a layer to the map', () => {
    const map = service.initMap();
    const layer = service.createVectorLayer();
    spyOn(map, 'addLayer');
    service.addLayer(layer);
    expect(map.addLayer).toHaveBeenCalledWith(layer);
  });

  it('should create a vector source', () => {
    const source = service.createVectorSource();
    expect(source).toBeDefined();
  });

  it('should create an overlay', () => {
    const options = {element: document.createElement('div')};
    const overlay = service.createOverlay(options);
    expect(overlay).toBeDefined();
  });

  it('should add an overlay to the map', () => {
    const map = service.initMap();
    const overlay = service.createOverlay({element: document.createElement('div')});
    spyOn(map, 'addOverlay');
    service.addOverlay(overlay);
    expect(map.addOverlay).toHaveBeenCalledWith(overlay);
  });

  it('should handle map click', () => {
    const map = service.initMap();
    const mapSpy = spyOn(map, 'getCoordinateFromPixel').and.returnValue([0, 0]);
    spyOn((service as any).mapClickSubject, 'next');
    const event = {pixel: [10, 10]};
    service['handleMapClick'](event);
    expect((service as any).mapClickSubject.next).toHaveBeenCalledOnceWith(<any>jasmine.any(Object));
  });

  it('should handle map hover', () => {
    const map = service.initMap();
    spyOn((service as any).mapHoverSubject, 'next');
    const event = {pixel: [10, 10]};
    service['handleMapHover'](event);
    expect((service as any).mapHoverSubject.next).toHaveBeenCalledOnceWith(<any>jasmine.any(Object));
  });
});
