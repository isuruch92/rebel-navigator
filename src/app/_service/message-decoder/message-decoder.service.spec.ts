import {TestBed} from '@angular/core/testing';

import {MessageDecoderService, SecretMessage} from './message-decoder.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Marker} from "../../_model/marker.model";
import {ErrorHandlerService} from "../error-handler/error-handler.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


describe('MessageDecoderService', () => {
  let service: MessageDecoderService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [MessageDecoderService, ErrorHandlerService, MatSnackBar],
    });
    service = TestBed.inject(MessageDecoderService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the secret.json and decrypt the message', () => {
    const mockResponse: SecretMessage = {
      message: btoa(JSON.stringify([{id: 1, lat: 50, long: 100}])),
    };

    service.decodedMessage$.subscribe((markers: Marker[]) => {
      expect(markers).toEqual([{id: 1, lat: 50, long: 100}]);
    });

    const req = httpTestingController.expectOne(service['baseUrl']);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should decrypt the secret message properly', () => {
    const encodedMessage = btoa(JSON.stringify([{id: 1, lat: 100, long: 200}]));
    const decodedMessage = (service as any)['decryptMessage'](encodedMessage);

    expect(decodedMessage).toEqual([{id: 1, lat: 100, long: 200}]);
  });

  it('should handle error when message decryption fails', () => {
    spyOn(service as any, 'handleError');
    const invalidEncodedMessage = 'invalid_base64_string';

    const result = (service as any)['decryptMessage'](invalidEncodedMessage);

    expect((service as any).handleError).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should handle error when API request fails', () => {
    spyOn(service as any, 'handleError');
    const message = 'Failed to retrieve the secret';

    service.decodedMessage$.subscribe(() => {
      fail('Should not emit');
    }, (error) => {
      expect((service as any).handleError).toHaveBeenCalledWith(error, <any>message);
    });

    const req = httpTestingController.expectOne(service['baseUrl']);
    req.error(new ErrorEvent('Error'), {status: 404, statusText: 'Not Found'});
  });
});
