import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Project, ProjectStatus, TypeStatutProjet } from '../core/project.model';
import { ProjectService } from '../core/project.service';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { Direction } from '@angular/cdk/bidi';
import { TruncatePipe, PluralPipe, StripHtmlPipe } from '../core/pipes';
import { DatePipe, KeyValuePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    standalone: true,
    imports: [
      StripHtmlPipe,
        CdkDropList,
        CdkDrag,
        MatProgressBarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        DatePipe,
        KeyValuePipe,
        TruncatePipe,
        PluralPipe,
    ],
})
export class BoardComponent implements OnInit {
  public lists: object;
  projects: any[] = [];
  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private r:Router
 
  ) {
    this.lists = {};
  }

  public ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      // First, assign the projects data to this.projects
      this.projects = projects;
    
      // Then, split projects into status categories

    });
    
  }

  unsorted = (): number => {
    return 0;
  };
  public drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer !== event.container) {
      const project = event.item.data;
      // project.status = ProjectStatus[event.container.id];
      project.status =
        ProjectStatus[JSON.parse(JSON.stringify(event.container.id))];
      this.projectService.updateObject(project);
    }
  }
  


  public removeProject(id: string): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.deleteProject(id).subscribe(() => {
          Swal.fire(
            'Supprimé!',
            'Votre projet a été supprimé.',
            'success'
          );
          this.ngOnInit(); // Ou une autre méthode pour actualiser la liste des projets
        }, (error) => {
          // Gérer l'erreur ici, par exemple :
          Swal.fire(
            'Erreur!',
            'La suppression du projet a échoué.',
            'error'
          );
        });
      }
    });
  }

  public newProjectDialog(): void {
    this.dialogOpen('Create new project', null,null);
  }

  public editProjectDialog(id: string,projectt:any): void {
    this.dialogOpen('Edit project', id,projectt);
  }
  public route(id: string): void {
    this.r.navigate(['admin/projects/estimates', id]);
  }
  
  
  private dialogOpen(title: string, projectId: string| null ,projectt:any| null): void {
    let tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';
    this.dialog.open(ProjectDialogComponent, {
      height: '85%',
      width: '55%',
      autoFocus: true,
      data: {
        title,
        projectId, // projectId can now be a string or null
        projectt,
      },
      direction: tempDirection,
    });
  }
  
  convertDate(dateStr: string): string {
    return moment(dateStr, 'DD-MM-YYYY').format('YYYY-MM-DD');
  }
  
  
}
