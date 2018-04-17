import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent implements OnInit, OnDestroy {

  location: string;
  locationSubscriber;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.location = this.locationService.getCity();

    this.locationSubscriber = this.locationService.cityEvent.subscribe((city) => {
      this.location = city;
    });
  }

  ngOnDestroy() {
    this.locationSubscriber.unsubscribe();
  }


}
