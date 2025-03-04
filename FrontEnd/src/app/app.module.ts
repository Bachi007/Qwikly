import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';
import { UserIncidentComponent } from './user-incident/user-incident.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginregisterComponent } from './loginregister/loginregister.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeRequestComponent } from './change-request/change-request.component';
import { ViewincidentsComponent } from './viewincidents/viewincidents.component';
import { ViewrequestComponent } from './viewrequest/viewrequest.component';
import { ItsupportComponent } from './itsupport/itsupport.component';
import { ItIncidentComponent } from './it-incident/it-incident.component';
import { ItChangerequestComponent } from './it-changerequest/it-changerequest.component';
import { ItDashboardComponent } from './it-dashboard/it-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminChangerequestComponent } from './admin-changerequest/admin-changerequest.component';
import { AdminIncidentComponent } from './admin-incident/admin-incident.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserHomeComponent,
    UserDashBoardComponent,
    UserIncidentComponent,
    MessageComponent,
    LoginregisterComponent,
    ChangeRequestComponent,
    ViewincidentsComponent,
    ViewrequestComponent,
    ItsupportComponent,
    ItIncidentComponent,
    ItChangerequestComponent,
    ItDashboardComponent,
    AdminDashboardComponent,
    AdminChangerequestComponent,
    AdminIncidentComponent,
    AdminComponent,
    AdminUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
