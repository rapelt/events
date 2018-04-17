import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocationService {

  UNKNOWN = "Unknown";
  PENDING = "Pending";

  OPTIONS = {
    enableHighAccuracy: false,
    timeout: 25000,
    maximumAge: 0
  };

  errorMsg = '';

  city = this.PENDING;

  cityEvent: Subject<string> = new Subject();

  constructor(private http: HttpClient) {
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((success) => {
        this.getCityFromGoogle(success.coords.latitude, success.coords.longitude).then((city) => {
          this.setCity(city);
          resolve();
        }).catch((error) => {
          console.log(error);
          this.setCity(this.UNKNOWN);
          reject();
        });
      }, (error) => {
        this.locationError(error);
        reject();
      }, this.OPTIONS);
    });
  }

  getCity() {
    if (this.city === this.PENDING) {
      this.getLocation();
    }
    return this.city;
  }

  setCity(city) {
    this.city = city;
    this.cityEvent.next(city);
  }

  getCityFromGoogle(lat, long): Promise<string> {
    return this.http.get(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng='
      + lat
      + ','
      + long
      + '&sensor=true&result_type=administrative_area_level_2&key=AIzaSyASd6Qzpn95F5CzZK56Stq9iS83S8YUGSA')
      .toPromise().then((result) => {
        return result['results'][0].address_components[0].short_name;
      });
  }

  locationError(error) {
    this.setCity(this.UNKNOWN);

    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.errorMsg = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        this.errorMsg = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        this.errorMsg = 'The request to get user location timed out.';
        break;
      default:
        this.errorMsg = 'An unknown error occurred.';
        break;
    }
  }

}
