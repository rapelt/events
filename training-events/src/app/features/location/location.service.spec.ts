import { TestBed, inject } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class MockHttp {
  public get() {}
}

describe('LocationService', () => {
  let mockHttp: MockHttp;
  let service: LocationService;

  const brisbane = "Brisbane";

  const successfulGeoLocationResonse = {
    coords: {
      latitude: 123.123,
      longitude: 93.93
    }
  };

  const successfulResponseFromGoogle = {
    results: [{
      address_components: [{
        "short_name": "Brisbane"
      }]
    }]
  };

  beforeEach(() => {
    mockHttp = new MockHttp();
    TestBed.configureTestingModule({
      providers: [LocationService,
        {provide: HttpClient, useValue: mockHttp}
      ],
      imports: [
      ]
    });
  });

  beforeEach(inject([LocationService], (locationService: LocationService) => {
    service = locationService;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getLocation should set city when successful response from google', (done) => {
    spyOn(navigator.geolocation,"getCurrentPosition").and.callFake(function() {
      arguments[0](successfulGeoLocationResonse);
    });

    spyOn(service, 'getCityFromGoogle').and.returnValue(new Promise((resolve) => {resolve('Brisbane')}));
    expect(service.city).toEqual('Pending');

    service.getLocation().then(() => {
      expect(service.city).toEqual('Brisbane');
      done();
    });
  });

  it('getLocation should set city with Unknown when unsuccessful response from google', (done) => {
    spyOn(navigator.geolocation,"getCurrentPosition").and.callFake(function() {
      arguments[0](successfulGeoLocationResonse);
    });

    spyOn(service, 'getCityFromGoogle').and.returnValue(new Promise((resolve, reject) => {reject('Brisbane')}));
    expect(service.city).toEqual('Pending');

    service.getLocation().then(() => {
    }).catch(() => {
      expect(service.city).toEqual('Unknown');
      done();
    });
  });

  it('getLocation should set city with Unknown when unsuccessful response from navigator', (done) => {
    spyOn(navigator.geolocation,"getCurrentPosition").and.callFake(function() {
      arguments[1]("Error");
    });

    expect(service.city).toEqual('Pending');

    service.getLocation().then(() => {
    }).catch(() => {
      expect(service.city).toEqual('Unknown');
      done();
    });
  });

  it('getCity should call getLocation when city is pending', () => {
    spyOn(service,"getLocation");
    expect(service.city).toEqual('Pending');

    service.getCity();
    expect(service.getLocation).toHaveBeenCalled();
  });

  it('getCity should not call getLocation when city is set', () => {
    const brisbane = "Brisbane";
    spyOn(service,"getLocation");
    service.city = brisbane;

    const city = service.getCity();

    expect(service.getLocation).toHaveBeenCalledTimes(0);
    expect(city).toEqual(brisbane);
  });

  it('setCity should send event', () => {
    spyOn(service.cityEvent,"next");

    service.setCity(brisbane);
    expect(service.city).toEqual(brisbane);
    expect(service.cityEvent.next).toHaveBeenCalled();
  });

  it('getCityFromGoogle should return the city name', (done) => {
    spyOn(mockHttp,'get').and.returnValue(Observable.of(successfulResponseFromGoogle));

    service.getCityFromGoogle(
      successfulGeoLocationResonse.coords.latitude,
      successfulGeoLocationResonse.coords.longitude)
      .then((result) => {
        expect(result).toEqual(brisbane);
        done();
    });
  });

  it('locationError should set city to Unknown', () => {
    service.locationError({code: 1});
    expect(service.city).toEqual("Unknown");
  });

});
