import {TestBed} from '@angular/core/testing';

import {DistanceService} from './distance.service';
import {Marker} from "../../_model/marker.model";

describe('DistanceService', () => {
    let service: DistanceService;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [DistanceService],});
        service = TestBed.inject(DistanceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('calculateDistanceOfMarkers', () => {
        it('should calculate distance for each marker', () => {
            const markers: Marker[] = [
                {id: 1, lat: 0, long: 0},
                {id: 2, lat: 0, long: 1},
                {id: 3, lat: 1, long: 0},
            ];

            service.calculateDistanceOfMarkers(markers, 0, 0);

            markers.forEach((marker) => {
                expect(marker.distance).toBeDefined();
                expect(marker.distance).toBeGreaterThanOrEqual(0);
            });
        });
    });

    describe('sortMarkersByDistance', () => {
        it('should sort markers by distance in ascending order', () => {
            const markers: Marker[] = [
                {id: 1, lat: 0, long: 1, distance: 5},
                {id: 2, lat: 0, long: 0, distance: 2},
                {id: 3, lat: 0, long: 2, distance: 8},
            ];

            const sortedMarkers = service.sortMarkersByDistance(markers);

            expect(sortedMarkers.length).toBe(markers.length);
            expect(sortedMarkers[0].distance).toBeLessThanOrEqual(sortedMarkers[1].distance!);
            expect(sortedMarkers[1].distance).toBeLessThanOrEqual(sortedMarkers[2].distance!);
        });

        it('should not modify the original array', () => {
            const markers: Marker[] = [
                {id: 1, lat: 0, long: 1, distance: 5},
                {id: 2, lat: 0, long: 0, distance: 2},
                {id: 3, lat: 0, long: 2, distance: 8},
            ];

            service.sortMarkersByDistance(markers);

            expect(markers[0].distance).toBe(5);
            expect(markers[1].distance).toBe(2);
            expect(markers[2].distance).toBe(8);
        });
    });

    describe('calculateDistance', () => {
        it('should calculate the distance between two coordinates', () => {
            const lat1 = 0;
            const lon1 = 0;
            const lat2 = 1;
            const lon2 = 1;

            const distance = (DistanceService as any).calculateDistance(lat1, lon1, lat2, lon2);
            expect(distance).toBeCloseTo(157.249, 2);
        });
    });

    describe('deg2rad', () => {
        it('should convert degrees to radians', () => {
            const degrees = 180;
            const radians = (DistanceService as any).deg2rad(degrees);

            expect(radians).toBe(Math.PI);
        });
    });
});
