import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit(): void {
   
    let user = sessionStorage.getItem('loggedin');
    if(user == null){
      this.myrouter.navigateByUrl('');
    }
    
  }

  constructor(private myrouter:Router){}
  @ViewChild('myTag') myTag: any;
  isselected=false;
  user:any;
  username:any;

  togglebar(){
    if (this.myTag.nativeElement.id) {
      this.isselected = !this.isselected;
    }
  }
  logout(){
    sessionStorage.removeItem("loggedin");
    this.myrouter.navigateByUrl('');
  }
}
