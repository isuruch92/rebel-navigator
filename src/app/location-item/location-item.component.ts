import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationListItem} from "../_model/location-list-item.model";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {RoundingDistanceDirective} from "../_directive/rounding-distance.directive";
import {SentenceCasePipe} from "../_pipe/sentence-case.pipe";
import {StateService} from "../_service/state/state.service";
import {DialogService} from "../_service/dialog/dialog.service";
import {LocationDetailComponent} from "../location-detail/location-detail.component";

@Component({
  selector: 'app-location-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RoundingDistanceDirective, SentenceCasePipe],
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationItemComponent {
  @Input() location!: LocationListItem;

  constructor(private stateService: StateService,
              private dialogService: DialogService) {
  }

  public handleMarkOnMap(): void {
    this.stateService.emitMarkedEntity(this.location.id);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  public handleMoreClick() {
    this.dialogService.openDialog(LocationDetailComponent, this.location);
  }
}
