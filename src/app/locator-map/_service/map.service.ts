import { Injectable } from "@angular/core";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Overlay } from "ol";
import { transform } from "ol/proj";
import { defaults as defaultControls } from "ol/control/defaults";
import { Observable, Subject } from "rxjs";
import { Options } from "ol/Overlay";
import { unByKey } from "ol/Observable";
import { getVectorContext } from "ol/render";
import { easeOut } from "ol/easing";
import { Icon, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";

export enum Color {
  BLUE,
  RED,
}

@Injectable({
  providedIn: "root",
})
export class MapService {
  private map: Map | undefined;
  private mapClickSubject: Subject<any> = new Subject<any>();
  public mapClick$: Observable<any> = this.mapClickSubject.asObservable();
  private initialZoom = 1;

  private mapHoverSubject: Subject<any> = new Subject<any>();
  public mapHover$: Observable<any> = this.mapHoverSubject.asObservable();

  public initMap(): Map {
    this.map = new Map({
      target: "openlayers-map",
      controls: defaultControls({ attribution: false }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: this.initialZoom,
        maxZoom: 10,
        minZoom: 0,
        extent: new View().getProjection().getExtent(),
      }),
    });

    this.map.on("click", this.handleMapClick.bind(this));
    this.map.on("pointermove", this.handleMapHover.bind(this));

    return this.map;
  }

  public updateMap() {
    setTimeout(() => {
      if (this.map instanceof Map) {
        this.map.updateSize();
      }
    }, 200);
  }

  public createVectorLayer(): VectorLayer<any> {
    return new VectorLayer();
  }

  public addLayer(layer: VectorLayer<any>): void {
    if (this.map instanceof Map) {
      this.map.addLayer(layer);
    }
  }

  public createVectorSource(): VectorSource {
    return new VectorSource();
  }

  public createOverlay(options: Options): Overlay {
    return new Overlay(options);
  }

  public addOverlay(overlay: Overlay): void {
    if (this.map instanceof Map) {
      this.map.addOverlay(overlay);
    }
  }

  private handleMapClick(event: any): void {
    if (this.map instanceof Map) {
      const clickedCoords = this.map.getCoordinateFromPixel(event.pixel);
      if (clickedCoords) {
        const [longitude, latitude] = transform(
          clickedCoords,
          "EPSG:3857",
          "EPSG:4326"
        );
        this.mapClickSubject.next({ longitude, latitude, clickedCoords });
      }
    }
  }

  private handleMapHover(event: any): void {
    if (this.map instanceof Map) {
      const feature = this.map.forEachFeatureAtPixel(event.pixel, (f) => f);
      this.mapHoverSubject.next({ feature });
    }
  }

  public flashMarker(
    feature: Feature,
    markerLayer: VectorLayer<any>,
    color: Color
  ): void {
    const start = Date.now();
    const flashGeom = feature.getGeometry()!.clone();
    const listenerKey = markerLayer.on("postrender", (event) =>
      this.animateFlash(event, start, flashGeom, color)
    );

    window.setTimeout(() => {
      unByKey(listenerKey);
    }, 3000);
  }

  private animateFlash(
    event: any,
    start: number,
    flashGeom: any,
    color: Color
  ): void {
    const frameState = event.frameState;
    const elapsed = frameState.time - start;

    const vectorContext = getVectorContext(event);
    const elapsedRatio = elapsed / 3000;
    const radius = easeOut(elapsedRatio) * 25 + 5;
    const opacity = easeOut(1 - elapsedRatio);

    let strokeColor =
      color === Color.RED
        ? `rgba(255, 0, 0, ${opacity})`
        : `rgba(57, 137, 252, ${opacity})`;

    const style = new Style({
      image: new CircleStyle({
        radius: radius,
        stroke: new Stroke({
          color: strokeColor,
          width: 0.25 + opacity,
        }),
      }),
    });

    vectorContext.setStyle(style);
    vectorContext.drawGeometry(flashGeom);

    if (this.map instanceof Map) {
      this.map.render();
    }
  }

  public getMarkerFeatureById(
    markerId: number | string,
    markerLayer: VectorLayer<any>
  ): Feature | undefined {
    const source = markerLayer.getSource();
    const features = source.getFeatures();
    return features.find((feature: Feature) => feature.get("id") === markerId);
  }

  public getAllMarkers(markerLayer: VectorLayer<any>): Feature[] {
    const source = markerLayer.getSource();
    const features = source.getFeatures();
    return features.filter(
      (feature: Feature) => feature.get("id") !== "current"
    );
  }

  public resetMapZoom() {
    if (this.map instanceof Map) {
      const mapView = this.map.getView();
      mapView.setZoom(this.initialZoom);
      mapView.setCenter([0, 0]);
    }
  }
}
