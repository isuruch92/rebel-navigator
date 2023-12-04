import {TestBed} from '@angular/core/testing';

import {ErrorHandlerService, panelClassMap} from './error-handler.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarData, SnackBarType} from "../../_model/snackbar.model";
import {SnackbarComponent} from "../../snackbar/snackbar.component";

describe('ErrorHandlerService', () => {
    let service: ErrorHandlerService;
    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

        TestBed.configureTestingModule({
            providers: [ErrorHandlerService, {provide: MatSnackBar, useValue: spy}]
        });
        service = TestBed.inject(ErrorHandlerService);
        snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should open snackbar with correct parameters', () => {
        const snackBarData: SnackBarData = {
            type: SnackBarType.SUCCESS,
            duration: 2000,
            message: "Success"
        };

        service.openSnackBar(snackBarData);

        expect(snackBarSpy.openFromComponent).toHaveBeenCalledWith(
            SnackbarComponent,
            jasmine.objectContaining({
                duration: snackBarData.duration,
                data: snackBarData,
                panelClass: [panelClassMap[snackBarData.type]],
            })
        );
    });

    it('should return custom message when provided', () => {
        const customMessage = 'Custom error message';
        const error: any = {
            name: 'SomeError',
            statusText: 'Internal Server Error',
        };

        const result = service.getErrorMessage(error, customMessage);

        expect(result).toEqual(`${customMessage} : ${error.name} : ${error.statusText}`);
    });
});
