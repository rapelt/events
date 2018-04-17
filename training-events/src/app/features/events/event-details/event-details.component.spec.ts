import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsComponent } from './event-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;

  const testEvent = {
    title: 'A Training Course',
    image_url: 'http://www.google.com',
    location: 'Brisbane',
    available_seats: 15,
    date: '2018-04-19T07:00:00.416Z'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsComponent ],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'event', component: EventDetailsComponent}])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
