import { Component } from '@angular/core';
import { IncidentService } from '../incident.service';

@Component({
  selector: 'app-it-changerequest',
  templateUrl: './it-changerequest.component.html',
  styleUrl: './it-changerequest.component.css'
})
export class ItChangerequestComponent {

  constructor(private service:IncidentService){}
  newstatus:any;
  data:any;obj:any;
  update(i:any){
    this.data=i;
  }
  status(a:any){
    this.obj=a;
  }
  result:any;
  updatestatus(){
    var changestatus={
      "status":this.newstatus
    }
    this.service.updaterequeststatus(this.obj._id,changestatus).subscribe((res)=>{
      this.result=res;
      alert(this.result.message)
      console.log(this.result)
      this.ngOnInit();
    })
  }






  allrequests:any;
  ngOnInit(){
    this.service.getChangeRequest().subscribe((res)=>{
      this.allrequests=res;
    })
  }

}
