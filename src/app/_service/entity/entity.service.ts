import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {EntityDetails} from "../../_model/entity-details.model";
import {ErrorHandlerService} from "../error-handler/error-handler.service";
import {SnackBarType} from "../../_model/snackbar.model";

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private baseUrl = 'https://akabab.github.io/starwars-api/api/all.json';

  entities$: Observable<EntityDetails[]> = this.http.get<EntityDetails[]>(this.baseUrl)
    .pipe(
      tap(() => this.handleSuccess('Entities retrieved successfully!')),
      catchError((error) => {
        this.handleError(error, 'Failed to retrieve the entities');
        return throwError(error);
      })
    );

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
  }

  private handleError(error: HttpErrorResponse | any, customMessage: string): void {
    this.errorHandlerService.openSnackBar({
      message: this.errorHandlerService.getErrorMessage(error, customMessage),
      type: SnackBarType.ERROR,
      actionText: 'Retry',
    });
  }

  private handleSuccess(customMessage: string): void {
    this.errorHandlerService.openSnackBar({
      message: customMessage,
      type: SnackBarType.SUCCESS,
      duration: 3000
    });
  }
}
