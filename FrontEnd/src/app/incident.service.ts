import { Injectable } from '@angular/core';
import { incident } from './incident';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor(private http:HttpClient) { }
  incidents = [];
  SaveDataInDB(a: any) {
    console.log("Sending Data to API:", a);
    return this.http.post('http://localhost:5000/Saveincident', a);
  }

  getIncidents(id:any){
    console.log(id)
    return this.http.get('http://localhost:5000/getincident/'+id)
  }

  getall(){
    return this.http.get('http://localhost:5000/getincidents')
  }
  deleteIncident(id:any){
    return this.http.delete('http://localhost:5000/deleteincident/'+id);
  }

  addComments(id:any,obj:any){
    return this.http.patch(`http://localhost:5000/data/${id}`,obj);
  }
 
  addtochange(obj:any){
    return   this.http.post('http://localhost:5000/change-request',obj);
}
getAllIncidents(id:any){
  return this.http.get('http://localhost:5000/getchange/'+id)
}

getChangeRequest(){
  return this.http.get('http://localhost:5000/getchangerequest');
}
assignTask(payload: any) {
  return this.http.patch(`http://localhost:5000/assign-task`, payload);
}

gettasks(uid:any){
  return this.http.get('http://localhost:5000/gettasks/'+uid);
}

getallTasks(){
  return this.http.get('http://localhost:5000/getalltasks')
}

updatestatus(obj:any){
  return this.http.patch(`http://localhost:5000/update-status/${obj._id}`,obj);
}

deletechange(id:any){
  return this.http.delete(`http://localhost:5000/delete-request/${id}`);
}

updaterequeststatus(id:any,obj:any){
  return this.http.patch(`http://localhost:5000/updaterequeststatus/${id}`,obj)
}

}
