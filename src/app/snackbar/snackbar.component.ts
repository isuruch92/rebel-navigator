import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SnackBarData, SnackBarType} from "../_model/snackbar.model";

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSnackBarModule, MatIconModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackbarComponent {
  public snackBarRef = inject(MatSnackBarRef);
  public iconMap = {
    [SnackBarType.SUCCESS]: 'check_circle',
    [SnackBarType.ERROR]: 'error',
    [SnackBarType.WARNING]: 'warning',
  };

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {
  }
}
