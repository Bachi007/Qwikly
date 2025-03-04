import { Component } from '@angular/core';
import { LoginserviceService } from '../loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrl: './loginregister.component.css'
})
export class LoginregisterComponent {
  constructor(private router:Router,private service:LoginserviceService){}
  user : any;
  userinfo : any;
  username : any ;
  password : any ;
  welcome:any;
  userName:any;
  email:any;
  phone:any;
  role:any;
  result:any;
  registerNow(){
    let obj = {
      userName:this.userName,
      email:this.email,
      password:this.password,
      phone:this.phone,
      role:this.role
    }
    this.service.registerUser(obj).subscribe((res)=>{
      console.log(res);
      this.result=res;
      if(this.result['message'] == 'User created successfully'){
        alert('User Registered');
      }
    })
  }
  onLogin(){
    console.log("login called")
    let obj = {
      userName:this.userName,
      password:this.password
    }
    this.service.loginUser(obj).subscribe((res)=>{
      console.log(res);
      this.result=res;
      if(this.result['message'] == 'Login Successful'){
        alert('Login Successful');
        console.log(this.result.user.userName);
        if(this.result.user.role == 'EndUser'){
          this.router.navigateByUrl('/user/dashboard');
        }
        else if(this.result.user.role == 'ITSupport'){
          this.router.navigateByUrl('/it/dashboard');
        }
        else if(this.result.user.role=='Admin')
        {
          this.router.navigateByUrl('/admin/dashboard');
        }
        sessionStorage.setItem('loggedin',JSON.stringify({username:this.result.user.userName,id:this.result.user._id}));
      }

    })
  }
  
}
