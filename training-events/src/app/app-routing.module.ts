import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './features/events/events/events.component';
import { EventDetailsComponent } from './features/events/event-details/event-details.component';

const routes: Routes = [
  { path: '', component: EventsComponent },
  { path: 'event', component: EventDetailsComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
