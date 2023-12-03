import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";
import {LocationListItem} from "../../_model/location-list-item.model";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {
  }

  public openDialog(component: ComponentType<any>, item: LocationListItem) {
    const dialogRef = this.dialog.open(component,
      {data: item, panelClass: 'custom-dialog'});
  }
}
