import { Component } from '@angular/core';
import { IncidentService } from '../incident.service';

@Component({
  selector: 'app-viewrequest',
  templateUrl: './viewrequest.component.html',
  styleUrl: './viewrequest.component.css'
})
export class ViewrequestComponent {

  viewallrequest:any;user:any;userid:any
  constructor(private service:IncidentService){}
  ngOnInit(){
    this.user=sessionStorage.getItem('loggedin')
      this.user=JSON.parse(this.user);
      this.userid=this.user.username;
      this.service.getAllIncidents(this.userid).subscribe((res)=>{
        this.viewallrequest=res;
        console.log(this.viewallrequest)
      })
  }



}
