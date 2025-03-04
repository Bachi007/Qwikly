import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IncidentService } from '../incident.service';

@Component({
  selector: 'app-change-request',
  templateUrl: './change-request.component.html',
  styleUrl: './change-request.component.css'
})
export class ChangeRequestComponent {
  changeRequestForm: FormGroup;
  username: any;
  user: any;

  constructor(private fb: FormBuilder,private router:Router,private service:IncidentService) {
    this.changeRequestForm = this.fb.group({
      description: ['', Validators.required],
      impactAssessment: ['', Validators.required],
      urgency: ['Low', Validators.required],
      status: ['Pending', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      tasks: this.fb.array([]),
      submittedBy: [''],
      reviewedBy: [null, Validators.required]
    });
  }
  result:any;
onSubmit(event:Event){
  event.preventDefault();
  this.service.addtochange(this.changeRequestForm.value).subscribe((res:any)=>{
    this.result=res;
    alert(this.result.message)
    this.ngOnInit();
  })
  this.changeRequestForm.reset();
}
allrequests:any;
  ngOnInit(): void {
    this.service.getChangeRequest().subscribe((res:any)=>{
      this.allrequests=res;
      console.log(this.allrequests)
    })
    let user = sessionStorage.getItem('loggedin');
    if(user == null){
      this.router.navigateByUrl('/login');
    }
    else{
      this.user= JSON.parse(user);
      console.log(this.username)
      this.changeRequestForm.patchValue({
        submittedBy: this.user.username
      });
      
    }
  }

  get tasks(): FormArray {
    return this.changeRequestForm.get('tasks') as FormArray;
  }

  addTask(): void {
    const taskGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['Medium', Validators.required],
      status: ['Open', Validators.required],
      assignedTo:[null],
      createdBy: [this.user?.username || null],
      dueDate:new Date()
    });
    this.tasks.push(taskGroup);
  }

  removeTask(index: number): void {
    this.tasks.removeAt(index);
  }

}
