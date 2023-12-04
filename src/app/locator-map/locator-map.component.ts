import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnDestroy,
} from "@angular/core";
import { Map } from "ol";
import VectorLayer from "ol/layer/Vector";
import { Point } from "ol/geom";
import { Marker } from "../_model/marker.model";
import { Color, MapService } from "./_service/map.service";
import { combineLatest, map, Observable, Subject, takeUntil, tap } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";
import { MarkerService } from "./_service/marker.service";
import { PopupService } from "./_service/popup.service";
import { DistanceService } from "./_service/distance.service";
import { StateService } from "../_service/state/state.service";
import { LocationListItem } from "../_model/location-list-item.model";
import { EntityService } from "../_service/entity/entity.service";
import { EntityDetails } from "../_model/entity-details.model";
import { SnackBarType } from "../_model/snackbar.model";
import { ErrorHandlerService } from "../_service/error-handler/error-handler.service";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-locator-map",
  templateUrl: "./locator-map.component.html",
  styleUrls: ["./locator-map.component.scss"],
  standalone: true,
  imports: [NgIf, AsyncPipe, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocatorMapComponent implements AfterViewInit, OnDestroy {
  @Input() markers!: Marker[];
  private map: Map | undefined;
  private markerLayer!: VectorLayer<any>;
  private destroy$: Subject<void> = new Subject<void>();
  public markedCount: number = 0;
  public mapClick$ = this.mapService.mapClick$.pipe(
    takeUntil(this.destroy$),
    tap((event: any) => {
      this.handleMapClick(event);
    })
  );

  public mapHover$ = combineLatest([
    this.mapService.mapHover$,
    this.entityService.entities$,
  ]).pipe(
    takeUntil(this.destroy$),
    tap(([event, entities]: [any, EntityDetails[]]) => {
      this.handleMapHover(event, entities);
    })
  );

  public markedTarget$: Observable<any> = combineLatest([
    this.stateService.markedEntity$,
    this.entityService.entities$,
  ]).pipe(
    takeUntil(this.destroy$),
    map(([markedEntityId, entities]: [number, EntityDetails[]]) => {
      return entities.find((entity: EntityDetails) => {
        return entity.id === markedEntityId;
      });
    }),
    tap((entity: any) => {
      if (entity) {
        this.handleMarkEntity(entity);
      }
    })
  );

  constructor(
    private mapService: MapService,
    private markerService: MarkerService,
    private popupService: PopupService,
    private distanceService: DistanceService,
    private stateService: StateService,
    private entityService: EntityService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngAfterViewInit(): void {
    this.map = this.mapService.initMap();

    this.addMarkers();
    this.addPopup();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clearAllSelection() {
    const allFeatures = this.mapService.getAllMarkers(this.markerLayer);

    if (this.markedCount === 0 || !allFeatures || allFeatures.length === 0) {
      return;
    }

    allFeatures.forEach((feature) => {
      this.markerService.updateMarkerIcon(
        feature!,
        "/assets/marker-icon.png",
        48,
        48
      );
    });
    this.errorHandlerService.openSnackBar({
      message: "All Marked Locations Cleared!",
      type: SnackBarType.SUCCESS,
      duration: 2000,
    });
    this.mapService.resetMapZoom();
    this.markedCount = 0;
  }

  private addMarkers(): void {
    const features = this.markerService.generateMarkerFeatures(this.markers);
    const source = this.mapService.createVectorSource();
    source.addFeatures(features);
    this.markerLayer = this.mapService.createVectorLayer();
    this.markerLayer.setSource(source);

    for (let i = 0; i < features.length; i++) {
      this.mapService.flashMarker(features[i], this.markerLayer, Color.BLUE);
    }

    this.mapService.addLayer(this.markerLayer);
  }

  private addPopup(): void {
    const markerPopup = this.mapService.createOverlay(
      this.popupService.getPopupOptions("marker-popup")
    );
    this.popupService.setPopup(markerPopup);
    this.mapService.addOverlay(this.popupService.getPopup());
  }

  private handleMapClick(event: any): void {
    const clickedCoords = event.clickedCoords;
    // Remove the previous marker if it exists
    this.markerService.removeCurrentMarker(this.markerLayer);

    const markerFeature = this.markerService.createMarkerFeature(
      clickedCoords,
      "current",
      "/assets/current-marker-icon.png",
      32,
      48,
      [0.5, 1]
    );
    this.markerLayer.getSource().addFeature(markerFeature);

    // Set the new marker as the current marker
    this.markerService.setCurrentMarker(markerFeature);

    this.distanceService.calculateDistanceOfMarkers(
      this.markers,
      event.longitude,
      event.latitude
    );
    const sortedMarkers = this.distanceService.sortMarkersByDistance(
      this.markers
    );
    this.stateService.emitSortedMarkers(sortedMarkers);
  }

  private handleMapHover(event: any, entities: EntityDetails[]) {
    const feature = event.feature;
    if (feature && feature.getProperties()["id"]) {
      const marker = this.markers.find(
        (m) => m.id === feature.getProperties()["id"]
      )!;
      const entity = entities.find(
        (e) => e.id === feature.getProperties()["id"]
      )!;
      const flatCoordinates: number[] = (
        feature.getGeometry() as Point
      ).getFlatCoordinates();
      const coordinates: [number, number] = [
        flatCoordinates[0],
        flatCoordinates[1],
      ];
      if (marker) {
        this.popupService.showPopup(coordinates, marker, entity);
      }
    } else {
      this.popupService.hidePopup();
    }
  }

  private handleMarkEntity(entity: any) {
    const markerFeature = this.mapService.getMarkerFeatureById(
      entity.id,
      this.markerLayer
    );
    this.markerService.updateMarkerIcon(
      markerFeature!,
      "/assets/marker-icon-selected.png",
      48,
      48
    );
    this.mapService.flashMarker(markerFeature!, this.markerLayer, Color.RED);
    this.mapService.resetMapZoom();
    this.markedCount++;
    this.errorHandlerService.openSnackBar({
      message: "Entity marked successfully!",
      type: SnackBarType.SUCCESS,
      duration: 2000,
    });
  }

  @HostListener("window:resize")
  private onWindowResize(): void {
    this.mapService.updateMap();
  }
}
