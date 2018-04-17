import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EventsComponent } from './features/events/events/events.component';
import { EventComponent } from './features/events/event/event.component';
import { EventService } from './features/events/event.service';
import { HttpClientModule } from '@angular/common/http';
import { SortedByDatePipe } from './features/pipes/sorted-by-date.pipe';
import { LimitPipe } from './features/pipes/limit.pipe';
import { EventDetailsComponent } from './features/events/event-details/event-details.component';
import { LocationService } from './features/location/location.service';
import { ViewLocationComponent } from './features/location/view-location/view-location.component';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventComponent,
    SortedByDatePipe,
    LimitPipe,
    EventDetailsComponent,
    ViewLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    EventService,
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
