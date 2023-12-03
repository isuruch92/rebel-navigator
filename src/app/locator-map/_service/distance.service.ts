import {Injectable} from '@angular/core';
import {Marker} from "../../_model/marker.model";

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  public calculateDistanceOfMarkers(markers: Marker[], longitude: number, latitude: number) {
    markers.forEach(marker => {
      marker.distance = DistanceService.calculateDistance(
        latitude,
        longitude,
        marker.lat,
        marker.long
      );
    });
  }

  public sortMarkersByDistance(markers: Marker[]): Marker[] {
    return markers.slice().sort((a: Marker, b: Marker) => (a.distance! > b.distance! ? 1 : -1));
  }

  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; //Earth's radius in KM
    const dLat = DistanceService.deg2rad(lat2 - lat1);
    const dLon = DistanceService.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(DistanceService.deg2rad(lat1)) * Math.cos(DistanceService.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
