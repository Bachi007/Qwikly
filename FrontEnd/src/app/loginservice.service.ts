import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient) { }

  registerUser(obj:any){
    return this.http.post('http://localhost:5000/users/register',obj);
  }

  loginUser(obj:any){
    console.log(obj)
    return this.http.post('http://localhost:5000/users/login',obj);
  }

  getAllusers(){
    return this.http.get('http://localhost:5000/users/getusers');
  }
  getUserData(){
    return this.http.get('http://localhost:5000/users/UserDetails')
  }
  AddUserData(a: any) {
    return this.http.post('http://localhost:5000/users/AddUserDetails', a);
  }
  deleteData(a:any){
    return this.http.delete(`http://localhost:5000/users/DeleteUser/${a}`)
  }
  getSingleData(a:any){
    return this.http.get(`http://localhost:5000/users/SingleUserData/${a}`)
  }

  getCount(){
    return this.http.get(`http://localhost:5000/count`);
  }

}
