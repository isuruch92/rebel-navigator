import {Injectable} from '@angular/core';
import {Marker} from "../../_model/marker.model";
import {Feature} from "ol";
import {fromLonLat} from "ol/proj";
import {Point} from "ol/geom";
import {Icon, Style} from "ol/style";
import VectorLayer from "ol/layer/Vector";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private currentMarker!: Feature;

  public generateMarkerFeatures(markers: Marker[]): Feature[] {
    if (!markers?.length) {
      return [];
    }
    const features: Feature[] = [];

    markers.forEach((marker) => {
      const coords = fromLonLat([marker.long, marker.lat]);
      const markerFeature = this.createMarkerFeature(coords, marker.id, '/assets/marker-icon.png', 48, 48);

      features.push(markerFeature);
    });

    return features;
  }

  public createMarkerFeature(coords: Array<number>, id: number | string, iconSrc: string, width: number, height: number, anchor?: number[]): Feature {
    const markerFeature = new Feature({
      geometry: new Point(coords),
      name: `Marker ${id}`,
      id: id,
    });

    markerFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: anchor ? anchor : [0.5, 0.5],
          src: iconSrc,
          width: width,
          height: height
        }),
      })
    );

    return markerFeature;
  }

  public setCurrentMarker(marker: Feature): void {
    this.currentMarker = marker;
  }

  public getCurrentMarker(): Feature {
    return this.currentMarker
  }

  public removeCurrentMarker(markerLayer: VectorLayer<any>): void {
    if (markerLayer && this.currentMarker) {
      markerLayer.getSource().removeFeature(this.currentMarker);
    }
  }

  public updateMarkerIcon(markerFeature: Feature, newIconSrc: string, width: number, height: number): void {
    if (markerFeature) {
      markerFeature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            src: newIconSrc,
            width: width,
            height: height
          }),
        })
      );
    }
  }
}
