import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of, switchMap, throwError} from "rxjs";
import {Marker} from "../../_model/marker.model";
import {ErrorHandlerService} from "../error-handler/error-handler.service";
import {SnackBarType} from "../../_model/snackbar.model";

export interface SecretMessage {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class MessageDecoderService {
  private baseUrl = 'https://aseevia.github.io/star-wars-frontend/data/secret.json';

  decodedMessage$: Observable<Marker[]> = this.http.get<SecretMessage>(this.baseUrl)
    .pipe(
      switchMap((data: SecretMessage) => {
        const markers = this.decryptMessage(data.message);
        this.handleSuccess('Secret fetched and decoded successfully!');
        return of(markers);
      }),
      catchError((error) => {
        this.handleError(error, 'Failed to retrieve the secret');
        return throwError(error);
      })
    )

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) {
  }

  private decryptMessage(encodedMessage: string): Marker[] {
    try {
      const decodedMessage = atob(encodedMessage);
      return JSON.parse(decodedMessage);
    } catch (error: any) {
      this.handleError(error, 'Failed to decode the secret:Invalid message');
      return [];
    }
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
