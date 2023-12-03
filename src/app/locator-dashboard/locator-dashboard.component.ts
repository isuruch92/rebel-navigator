import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocatorMapComponent} from "../locator-map/locator-map.component";
import {Marker} from "../_model/marker.model";
import {MessageDecoderService} from "../_service/message-decoder/message-decoder.service";
import {combineLatest, map, Observable} from "rxjs";
import {EntityService} from "../_service/entity/entity.service";
import {LocationListItem} from "../_model/location-list-item.model";
import {StateService} from "../_service/state/state.service";
import {EntityDetails} from "../_model/entity-details.model";
import {LocationListComponent} from "../location-list/location-list.component";

@Component({
  selector: 'app-locator-dashboard',
  standalone: true,
  imports: [CommonModule, LocatorMapComponent, LocationListComponent],
  templateUrl: './locator-dashboard.component.html',
  styleUrls: ['./locator-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocatorDashboardComponent {
  public decodedMessage$: Observable<Marker[]> = this.messageDecoderService.decodedMessage$;
  public locationList$: Observable<LocationListItem[]> = combineLatest([
    this.stateService.sortedMarkers$,
    this.entityService.entities$,
  ]).pipe(
    map(([sortedMarkers, entities]: [Marker[], EntityDetails[]]) => {
      return sortedMarkers.map((marker: Marker) => {
        const entity = entities.find((e: EntityDetails) => e.id === marker.id);
        return <any>{
          ...entity,
          distance: marker.distance
        };
      })
    })
  );

  constructor(private messageDecoderService: MessageDecoderService,
              private entityService: EntityService,
              private stateService: StateService) {
  }
}
