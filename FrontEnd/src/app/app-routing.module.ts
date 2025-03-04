import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';
import { UserIncidentComponent } from './user-incident/user-incident.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginregisterComponent } from './loginregister/loginregister.component';
import { ChangeRequestComponent } from './change-request/change-request.component';
import { ViewincidentsComponent } from './viewincidents/viewincidents.component';
import { ViewrequestComponent } from './viewrequest/viewrequest.component';
import { ItsupportComponent } from './itsupport/itsupport.component';
import { ItIncidentComponent } from './it-incident/it-incident.component';
import { ItChangerequestComponent } from './it-changerequest/it-changerequest.component';
import { ItDashboardComponent } from './it-dashboard/it-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AdminIncidentComponent } from './admin-incident/admin-incident.component';
import { AdminChangerequestComponent } from './admin-changerequest/admin-changerequest.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

const routes: Routes = [
  {path:'',component:LoginregisterComponent},
  {path:'user',component:NavbarComponent,
    children:[
    {path:'dashboard',component:UserDashBoardComponent},
    {path:'createincident',component:UserIncidentComponent},
    {path:'viewincident',component:ViewincidentsComponent},
    {path:'changerequest',component:ChangeRequestComponent},
    {path:'viewrequest',component:ViewrequestComponent}
    ]
  },
  {path:'it',component:ItsupportComponent,
    children:[
      {path:'incident',component:ItIncidentComponent},
      {path:'change',component:ItChangerequestComponent},
      {path:'dashboard',component:AdminDashboardComponent}
    ]
  },
  {path:'admin',component:AdminComponent,
    children:[
      {path:'incident',component:AdminIncidentComponent},
      {path:'change',component:AdminChangerequestComponent},
      {path:'dashboard',component:AdminDashboardComponent},
      {path:'users',component:AdminUsersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
