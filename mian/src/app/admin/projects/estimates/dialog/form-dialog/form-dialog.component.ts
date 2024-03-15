import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EstimatesService } from '../../estimates.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Estimates } from '../../estimates.model';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TASK_ROUTE } from 'app/task/task.routes';
import { TasksModel } from 'app/admin/projects/all-projects/core/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'app/admin/projects/all-projects/core/project.service';
import { AuthService } from '@core';
export interface DialogData {
  id: number;
  action: string;
  task: any;
  taskId:string;
  idProject:string;
  tasks:any[]
}

@Component({
    selector: 'app-form-dialog:not(k)',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogClose,
    ],
})
export class FormDialogComponent {
  action!: string; 
  dialogTitle!: string; 
  taskForm!: UntypedFormGroup ;

  task:any;
  user!:any
  p!:any
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public estimatesService: EstimatesService,
    private fb: UntypedFormBuilder,
    private actR : ActivatedRoute,
    private authService:AuthService,
    private projectService: ProjectService,
  ) {
   
  }
/*   estimates: Estimates; */
  ngOnInit(): void {
 
    this.taskForm = this.fb.group({
  
      NomTask: ['', [Validators.required]],
      priority: [''],
  
      startDate: ['', [Validators.required]],
      FinishDate: ['', [Validators.required]],
  
      statut: [''],
       description: ['', [Validators.required]],
       employeeAffected:['', [Validators.required]],
       projectId: [this.data.idProject],
    

  
    });
    this.action =this.data.action;
    if (this.action === 'edit' && this.data.taskId) {
      this.authService.getUserByTaskId( this.data.taskId).subscribe((datauser) => {
this.user=datauser
      });
      this.estimatesService.getTaskById(this.data.taskId).subscribe((dataa) => {
        console.log(this.data.taskId)    
       
        this.task = dataa;
        this.dialogTitle =  this.task.NomTask;
        const T= {
      _id:this.task._id,
          NomTask: this.task.NomTask,
          description: this.task.description,
          startDate : this.task.startDate,
          FinishDate : this.task.FinishDate,
          statut : this.task.statut ,
          priority : this.task.priority  ,
          employeeAffected : this.user._id ,
    
        };
/*     console.log(TSansU) */
      const ht=  this.taskForm.patchValue(T);
      console.log(ht)
      })

    } else {
      this.dialogTitle = 'New Estimates';
      const blankObject = {} as TasksModel;
      this.task = new  TasksModel();
    }

   
  }




  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
  if(this.data.taskId){
    this.updateT()
    Object.assign(this.data.task, this.taskForm.value);
  }else{
    this.estimatesService.createTask2(this.taskForm.value).subscribe()
   
    console.log(this.taskForm.value)
 
  }
   

  }
  updateT() {
    const updatedValues = {
      _id: this.taskForm.value._id,
      NomTask: this.taskForm.value.NomTask,
      description: this.taskForm.value.description,
      startDate:  this.taskForm.value.startDate,// Converts to string in specified format
      FinishDate:  this.taskForm.value.FinishDate,
      statut: this.taskForm.value.statut,
      priority: this.taskForm.value.priority,
    
  
      // Incluez 'f' si vous ne le mettez pas à jour ici
    };
  
    this.estimatesService.updateTask(this.data.taskId, updatedValues).subscribe(() => {


    });

  }

}

