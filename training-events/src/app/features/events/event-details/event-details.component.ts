import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Event from './../event.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  event: Event;

  private paramSubscriber: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.paramSubscriber = this.route.params.subscribe((params: Event) => {
      this.event = params;
    });
  }

  ngOnDestroy() {
    this.paramSubscriber.unsubscribe();
  }

}
