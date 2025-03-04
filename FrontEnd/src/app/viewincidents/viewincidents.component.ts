import { Component } from '@angular/core';
import { IncidentService } from '../incident.service';

@Component({
  selector: 'app-viewincidents',
  templateUrl: './viewincidents.component.html',
  styleUrl: './viewincidents.component.css'
})
export class ViewincidentsComponent {
  constructor(private service:IncidentService){}
  incidentreq:any;
   user:any;userid:any;
  result:any;
   deleteIncident(id:any){
    console.log("delete "+id)
      this.service.deleteIncident(id).subscribe((res)=>{
        this.result=res;
        alert(this.result.status)
        this.ngOnInit()
      })
   }

   ngOnInit(){
      this.user=sessionStorage.getItem('loggedin')
      this.user=JSON.parse(this.user);
      this.userid=this.user.username;
      this.service.getIncidents(this.userid).subscribe((data)=>{
        this.incidentreq=data;
        console.log(this.incidentreq)
      })

   }

}
