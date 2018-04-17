import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class EventService {

  events: Event[];

  constructor(private http: HttpClient) { }

  getEvents(): Promise<any> {
    return this.http.get('http://localhost:3000/events').toPromise();
  }

}
