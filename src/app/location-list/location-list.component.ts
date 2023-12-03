import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationListItem} from "../_model/location-list-item.model";
import {LocationItemComponent} from "../location-item/location-item.component";

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, LocationItemComponent],
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationListComponent {
  @Input() locationList!: LocationListItem[];
}
