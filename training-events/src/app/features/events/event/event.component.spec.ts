import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventComponent } from './event.component';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  const testEvent = {
    title: 'A Training Course',
    image_url: 'http://www.google.com',
    location: 'Brisbane',
    available_seats: 15,
    date: '2018-04-19T07:00:00.416Z'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    component.event = testEvent;
    fixture.detectChanges();
  });

  it('should render title in a p tag with class title', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('A Training Course');
  }));

  it('should render date in a p tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.date').textContent).toContain('19 Apr 18');
  }));

  it('should render location in a p tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.location').textContent).toContain('Brisbane');
  }));
});
