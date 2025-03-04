import { Component } from '@angular/core';
import { IncidentService } from '../incident.service';

@Component({
  selector: 'app-admin-incident',
  templateUrl: './admin-incident.component.html',
  styleUrl: './admin-incident.component.css'
})
export class AdminIncidentComponent {

  incidents:any;data:any;comment:any;
  result:any;
  update(i:any){
    this.data=i;

  }

  updateComment(){
    var comment={
      "comments":this.comment
    }
      this.service.addComments(this.data._id,comment).subscribe((res)=>{
        this.result=res;
        console.log(this.result)
        alert(this.result.message)
      })
  }
  getPriorityClass(priority: string) {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-danger text-white';
      case 'medium':
        return 'bg-warning text-dark';
      case 'low':
        return 'bg-info text-white';
      default:
        return 'bg-secondary text-white';
    }
  }
  constructor(private service:IncidentService){}
  ngOnInit(){
    this.service.getall().subscribe((res)=>{
      this.incidents=res;
      console.log(this.incidents)
    })
  }
}
