import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {LocationListItem} from "../_model/location-list-item.model";
import {RoundingDistanceDirective} from "../_directive/rounding-distance.directive";
import {SentenceCasePipe} from "../_pipe/sentence-case.pipe";
import {JoinArrayPipe} from "../_pipe/join-array.pipe";

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, RoundingDistanceDirective, SentenceCasePipe, JoinArrayPipe],
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public location: LocationListItem) {
  }
}
