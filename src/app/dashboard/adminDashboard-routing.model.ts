import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { addInstituteComponent } from "./addInstitute/addInstitute.component";
import { addParticipantComponent } from "./addParticipant/addParticipant.component";
import { addRefereeComponent } from './addReferee/addReferee.component';
import { addSportComponent } from './addSport/addSport.component';
import { addVenueComponent } from './addVenue/addVenue.component';

const routes: Routes = [
  { path: "addInstitute", component: addInstituteComponent },
  { path: "addParticipant", component: addParticipantComponent },
  { path: "addReferee", component: addRefereeComponent },
  { path: "addSport", component: addSportComponent },
  { path: "addVenue", component: addVenueComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule {}
