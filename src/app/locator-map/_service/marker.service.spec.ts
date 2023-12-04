import {TestBed} from '@angular/core/testing';

import {MarkerService} from './marker.service';
import {Marker} from "../../_model/marker.model";
import {fromLonLat} from "ol/proj";
import {Icon, Style} from "ol/style";

describe('MarkerService', () => {
    let service: MarkerService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [MarkerService]});
        service = TestBed.inject(MarkerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should generate marker features from markers', () => {
        const markers: Marker[] = [
            {id: 1, lat: 0, long: 0},
            {id: 2, lat: 1, long: 1},
        ];

        const features = service.generateMarkerFeatures(markers);

        expect(features.length).toBe(markers.length);

        features.forEach((feature, index) => {
            expect(true).toBeTruthy();
            expect(feature.get('id')).toBe(markers[index].id);
        });
    });

    it('should return an empty array if markers are undefined or empty', () => {
        expect(service.generateMarkerFeatures([])).toEqual([]);
        expect(service.generateMarkerFeatures([])).toEqual([]);
    });

    it('should create a marker feature with the provided parameters', () => {
        const coords = fromLonLat([0, 0]);
        const id = 1;
        const iconSrc = '/assets/marker-icon.png';
        const width = 48;
        const height = 48;

        const feature = service.createMarkerFeature(coords, id, iconSrc, width, height);

        expect(true).toBeTruthy();
        expect(feature.get('id')).toBe(id);

        const style = feature.getStyle();
        expect(style instanceof Style).toBeTruthy();

        const image = (style as any).getImage();
        expect(image instanceof Icon).toBeTruthy();
        expect(image.getSrc()).toBe(iconSrc);
    });
});
