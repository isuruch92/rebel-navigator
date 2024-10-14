import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationListItem} from "../_model/location-list-item.model";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {RoundingDistanceDirective} from "../_directive/rounding-distance.directive";
import {SentenceCasePipe} from "../_pipe/sentence-case.pipe";
import {StateService} from "../_service/state/state.service";
import {DialogService} from "../_service/dialog/dialog.service";
import {LocationDetailComponent} from "../location-detail/location-detail.component";
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-location-item',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    RoundingDistanceDirective, 
    SentenceCasePipe
  ],
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationItemComponent implements OnInit {
  @Input() location!: LocationListItem;
  @Input() id!: number;
  public isExpanded = false;
  public availableIcons = [4, 8, 13, 15, 16, 20, 21, 22, 27];

  constructor(private stateService: StateService,
              private dialogService: DialogService) {
  }
  ngOnInit(): void {
    console.log(this.location)
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

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }
}
