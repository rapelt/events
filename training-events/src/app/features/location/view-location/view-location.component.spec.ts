import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLocationComponent } from './view-location.component';
import { LocationService } from '../location.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventService } from '../../events/event.service';

describe('ViewLocationComponent', () => {
  let component: ViewLocationComponent;
  let fixture: ComponentFixture<ViewLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLocationComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LocationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init should subscribe to cityEvent', () => {
    const locationService = fixture.debugElement.injector.get(LocationService);
    expect(component.location).toEqual('Pending');
    locationService.cityEvent.next('Logan');
    expect(component.location).toEqual('Logan');
  });
});
