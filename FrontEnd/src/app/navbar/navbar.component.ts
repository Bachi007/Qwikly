import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
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
