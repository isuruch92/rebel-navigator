import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { HttpErrorResponse } from "@angular/common/http";
import { SnackBarData, SnackBarType } from "../../_model/snackbar.model";

const panelClassMap: Record<SnackBarType, string> = {
  [SnackBarType.SUCCESS]: "success-snackbar",
  [SnackBarType.ERROR]: "error-snackbar",
  [SnackBarType.WARNING]: "warning-snackbar",
};

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService {
  private readonly GENERIC_ERROR_MSG =
    "Sorry, an error has occurred. Please try again";
  private snackBarRef!: MatSnackBarRef<any>;

  constructor(private _snackBar: MatSnackBar) {}

  public openSnackBar(data: SnackBarData) {
    this.snackBarRef = this._snackBar.openFromComponent(SnackbarComponent, {
      duration: data.duration,
      data: data,
      panelClass: [panelClassMap[data.type]],
    });

    this.snackBarRef?.onAction().subscribe(() => {
      // console.log('The snackbar action was triggered!', data.actionText);
      this.handleErrorRetryAction();
    });

    // this.snackBarRef?.afterDismissed().subscribe(() => {
    //   console.log('The snackbar was dismissed');
    // });
  }

  private handleErrorRetryAction() {
    window.location.reload();
  }

  public getErrorMessage(
    error: HttpErrorResponse | any,
    customMessage: string
  ): string {
    let finalError = "";
    if (customMessage) {
      finalError += customMessage + " : ";
    }
    if (error?.name) {
      finalError += error.name + " : ";
    }
    if (error?.statusText) {
      finalError += error.statusText;
    }

    if (finalError.length > 0) {
      return finalError;
    }
    return this.GENERIC_ERROR_MSG;
  }
}
