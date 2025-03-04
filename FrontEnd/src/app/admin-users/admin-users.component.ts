import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from '../loginservice.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  userForm: FormGroup; 

  constructor(private fb: FormBuilder,private a:LoginserviceService) {

    this.userForm = this.fb.group({
      userName: ['',Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  arr:any;
  ngOnInit(){
    this.a.getUserData().subscribe((data:any)=>this.arr=data);
  }
  omodal=false;
  omodal1=false;
  openModal(){
    this.omodal = !this.omodal;
  }
  b:any;
  CreateUser(a:any){
    this.a.AddUserData(a.value).subscribe((data:any)=>{
      this.b = data;
      alert(this.b.message);
      this.openModal()
    this.userForm.reset();
    this.ngOnInit();
    })

  }
  UpdateUser(id:any){

  }
  DeleteUser(id:any){
    this.a.deleteData(id).subscribe((data:any)=>{
      this.b = data;
      alert(this.b.message);
      this.ngOnInit();
  })
  }
  selectedUser:any;
  seletUser(id:any){
    this.a.getSingleData(id).subscribe((data:any)=>{
      this.selectedUser = data;
    });
  }
}
