import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { IncidentService } from '../incident.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-incident',
  templateUrl: './user-incident.component.html',
  styleUrl: './user-incident.component.css'
})
export class UserIncidentComponent {
  incidentForm:FormGroup = new FormGroup({});
  constructor(private a:FormBuilder,private b:IncidentService,private router:Router){
    this.incidentForm = this.a.group({
      title: ['',Validators.required],
      description:['',Validators.required],
      priority:['',Validators.required],
      category: ['',Validators.required],
      createdBy:[null],
      comments:null
    })
  }
  user:any;username:any;
  ngOnInit(){
   
    let user = sessionStorage.getItem('loggedin');
    if(user == null){
      this.router.navigateByUrl('/login');
    }
    else{
      this.user= JSON.parse(user);
      console.log(this.username)
      this.incidentForm.patchValue({
        createdBy:this.username
      })
    }
  }
  c:any;
  IncidentFormDB(a:any){
    this.user=sessionStorage.getItem('loggedin')
    this.user=JSON.parse(this.user);
    this.username=this.user.username;
    console.log(this.username+"data added")
    a.value.status="Open"; 
    a.value.createdBy=this.username
  a.value.comments="";
  console.log(this.username)
  console.log(a.value)
  this.b.SaveDataInDB(a.value).subscribe((res)=>{
      this.c=res;
      alert(this.c.status)
    })
    a.reset();
  }
  }
