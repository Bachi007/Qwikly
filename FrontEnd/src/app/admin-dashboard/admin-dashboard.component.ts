import { ChangeDetectorRef, Component } from '@angular/core';
import { LoginserviceService } from '../loginservice.service';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { IncidentService } from '../incident.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  user: any;
  username: any;
  userid: any;
  allrequests: any = [];
  
  constructor(private service:LoginserviceService,private cdr: ChangeDetectorRef, private iservice:IncidentService,private router:Router ){

  }

  count:any;

  
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartLabels: string[] = ['Closed', 'Completed', 'Pending'];
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [{ data: [0, 0, 0] }]
  };

  public pieChartType: 'pie' = 'pie';;

  ngOnInit() {
    this.service.getCount().subscribe((res) => {
      this.count = res;
    });
  
    this.user = sessionStorage.getItem('loggedin');
    this.user = JSON.parse(this.user);
    if (!this.user) {
      this.router.navigateByUrl('/login');
    } else {
      this.username = this.user.username;
      this.userid = this.user.id;
    }
  
    this.iservice.getallTasks().subscribe((res: any) => {
      console.log(res);
      this.allrequests = res.map((task: any) => ({ ...task, showDropdown: false }));
  
      const closedCount = this.allrequests.filter((task: any) => task.status === 'Closed').length;
      const completedCount = this.allrequests.filter((task: any) => task.status === 'Completed').length;
      const pendingCount = this.allrequests.length - (closedCount + completedCount);
  
      // ✅ Use a new object reference so Angular detects the change
      this.pieChartData = { 
        labels: this.pieChartLabels, 
        datasets: [{ data: [closedCount, completedCount, pendingCount] }] 
      };
  
      this.cdr.detectChanges(); // ✅ Ensures UI updates
    });
  }
  

}
