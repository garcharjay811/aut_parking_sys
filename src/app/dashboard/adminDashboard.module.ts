import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { addInstituteComponent } from './addInstitute/addInstitute.component'
import { addParticipantComponent } from './addParticipant/addParticipant.component'
import { addRefereeComponent } from './addReferee/addReferee.component'
import { addSportComponent } from './addSport/addSport.component';
import { addVenueComponent } from './addVenue/addVenue.component';
import { AdminDashboardRoutingModule } from './adminDashboard-routing.model'
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material'
import { AngularMaterialModule } from '../angular-material.module'
import { addGroupComponent } from './addGroup/addGroup.component'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from '../app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [addInstituteComponent, addParticipantComponent, addSportComponent, addSportComponent, addVenueComponent, addRefereeComponent, addGroupComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    // FormsModule,
    AdminDashboardRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
]
})
export class AdminDashboardModule {}