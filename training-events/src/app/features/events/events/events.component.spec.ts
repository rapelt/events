import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
import { LimitPipe } from '../../pipes/limit.pipe';
import { SortedByDatePipe } from '../../pipes/sorted-by-date.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EventComponent } from '../event/event.component';
import { ViewLocationComponent } from '../../location/view-location/view-location.component';
import { EventService } from '../event.service';
import { LocationService } from '../../location/location.service';
import * as moment from 'moment';
import Event from '../event.interface';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  const swimClub = {
    'title': 'Swim Club',
    'image_url': 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_68460491.jpg',
    'date': moment().add(1, 'hours').toISOString(),
    'location': 'Brisbane',
    'available_seats': 14
  };

  const capnap = {
    'title': 'Cat Nap Group',
    'image_url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxut4j98oB6CBzDKoLjvUy-mSlXvdOAprM3-vAB5uHrR2I81pz',
    'date': moment().subtract(1, 'days').toISOString(),
    'location': 'Sydney',
    'available_seats': 16
  };

  const wally = {
    'title': 'Let\'s Find Wally',
    'image_url': 'http://d1vzko4h6qahek.cloudfront.net/images/2/books/large/ST2711.jpg',
    'date': moment().add(1, 'days').toISOString(),
    'location': 'Melbourne',
    'available_seats': 29
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventsComponent,
        LimitPipe,
        SortedByDatePipe,
        EventComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        EventService,
        LocationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set this events with events after today', (done) => {
    const eventService = fixture.debugElement.injector.get(EventService);
    const testEvents: Event[] = [ swimClub, capnap, wally];

    spyOn(eventService, 'getEvents').and.returnValue(
      new Promise((resolve) => {
        resolve(testEvents);
      })
    );
    component.ngOnInit();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.events.length).toEqual(2);
      expect(component.events[0]).toEqual(swimClub);
      expect(component.events[1]).toEqual(wally);
      done();
    });
  });

  it('should set this events with events after today and by location', (done) => {
    const eventService = fixture.debugElement.injector.get(EventService);
    const locationService = fixture.debugElement.injector.get(LocationService);

    const testEvents: Event[] = [swimClub, capnap, wally];

    spyOn(eventService, 'getEvents').and.returnValue(
      new Promise((resolve) => {
        resolve(testEvents);
      })
    );

    spyOn(locationService, 'getCity').and.returnValue("Brisbane");
    component.ngOnInit();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.events.length).toEqual(1);
      expect(component.events[0]).toEqual(swimClub);
      done();
    });
  });

  it('should filter by location when location is set', (done) => {
    const eventService = fixture.debugElement.injector.get(EventService);
    const locationService = fixture.debugElement.injector.get(LocationService);

    const testEvents: Event[] = [swimClub, capnap, wally];

    spyOn(eventService, 'getEvents').and.returnValue(
      new Promise((resolve) => {
        resolve(testEvents);
      })
    );

    component.ngOnInit();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      locationService.cityEvent.next('Brisbane');

      expect(component.events.length).toEqual(1);
      expect(component.events[0]).toEqual(swimClub);
      done();
    });
  });

  it('should not filter by location if location is unknown', (done) => {
    const eventService = fixture.debugElement.injector.get(EventService);
    const locationService = fixture.debugElement.injector.get(LocationService);

    const testEvents: Event[] = [swimClub, capnap, wally];

    spyOn(eventService, 'getEvents').and.returnValue(
      new Promise((resolve) => {
        resolve(testEvents);
      })
    );

    component.ngOnInit();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      locationService.cityEvent.next('Unknown');

      expect(component.events.length).toEqual(2);
      expect(component.events).toEqual([swimClub, wally]);
      done();
    });
  });
});
