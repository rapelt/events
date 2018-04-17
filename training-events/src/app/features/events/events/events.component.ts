import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import Event from '../event.interface';
import * as moment from 'moment';
import { LocationService } from '../../location/location.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventService, private locationService: LocationService) { }

  ngOnInit() {
    this.eventService.getEvents().then((events: Event[]) => {
      this.events = events.filter((event) => {
        return moment(event.date).isSameOrAfter(moment());
      });

      const city = this.locationService.getCity();

      if(city !== this.locationService.PENDING && city !== this.locationService.UNKNOWN){
        this.events = this.filterByCity(this.events, city);
      }
    });

    this.locationService.cityEvent.subscribe((city) => {
      if(city === this.locationService.UNKNOWN) return;
      this.events = this.filterByCity(this.events, city);
    });
  }

  filterByCity(events, city) {
    return this.events.filter((event) => {
      return event.location === city;
    });
  }
}
