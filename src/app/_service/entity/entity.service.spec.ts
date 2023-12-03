import {fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import {EntityService} from './entity.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ErrorHandlerService} from "../error-handler/error-handler.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackBarType} from "../../_model/snackbar.model";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('EntityService', () => {
  let service: EntityService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, MatSnackBarModule],
      providers: [ErrorHandlerService, MatSnackBar],
    });
    service = TestBed.inject(EntityService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the entities', fakeAsync(() => {
    const mockEntities = [{id: 1, name: 'Entity 1'}, {id: 2, name: 'Entity 2'}];

    service.entities$.subscribe(entities => {
      expect(entities).toEqual(<any>mockEntities);
    });

    const req = httpTestingController.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockEntities);
    tick();
    flush();
  }));

  it('should handle error when entities fetching failed', fakeAsync(() => {
    const errorHandlerService = TestBed.inject(ErrorHandlerService);
    const errorMessage = 'Failed to retrieve the entities';
    spyOn(errorHandlerService, 'getErrorMessage').and.returnValue(errorMessage);
    spyOn(errorHandlerService, 'openSnackBar');

    service.entities$.subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpTestingController.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));

    tick();

    expect(errorHandlerService.openSnackBar).toHaveBeenCalledOnceWith({
      message: errorMessage,
      type: SnackBarType.ERROR,
      actionText: 'Retry',
    });
  }));
});
