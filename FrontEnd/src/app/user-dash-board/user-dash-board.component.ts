import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrl: './user-dash-board.component.css'
})
export class UserDashBoardComponent {
  constructor(private a:Router){}

  ChangetoIncident(){

    this.a.navigateByUrl('/user/createincident')
  }
  ChangetoCR(){
    this.a.navigateByUrl('/user/changerequest')
  }

}
