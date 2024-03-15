import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from './project.model';
// import { PROJECTS } from "./project.data";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends UnsubscribeOnDestroyAdapter {
  private baseUrl = 'http://localhost:3000/project'; 
  private trash: Set<number> = new Set([]); // trashed projects' id; set is better for unique ids
  // private _projects: BehaviorSubject<object[]> = new BehaviorSubject([]);
  private _projects = new BehaviorSubject<object[]>([]);
  public readonly projects: Observable<object[]> =
    this._projects.asObservable();
  private readonly API_URL = 'assets/data/projects.json';

  constructor( private httpClient: HttpClient) {
    super();
    // this._projects.next(PROJECTS); // mock up backend with fake data (not Project objects yet!)
    this.getProjects();
  }

  /** CRUD METHODS */
  getAllProjectss(): void {
    this.subs.sink = this.httpClient.get<Project[]>(this.API_URL).subscribe({
      next: (data) => {
        this._projects.next(data); // mock up backend with fake data (not Project objects yet!)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      },
    });
  }







  public createOject(project: any): void {
    project.id = this._projects.getValue().length + 1; // mock Project object with fake id (we have no backend)
    this._projects.next(this._projects.getValue().concat(project));
  }

  public updateObject(project: any): void {
    const projects = this._projects.getValue();
    const projectIndex = projects.findIndex((t: any) => t.id === project.id);
    projects[projectIndex] = project;
    this._projects.next(projects);
  }



  public detachObject(project: Project): void {
    // add project id to trash
    this.trash.add(project.id);
    // force emit change for projects observers
    return this._projects.next(this._projects.getValue());
  }

  public attachObject(project: Project): void {
    // remove project id from trash
    this.trash.delete(project.id);
    // force emit change for projects observers
    return this._projects.next(this._projects.getValue());
  }
  createProject(project: any): Observable<any> {
    return this. httpClient.post(`${this.baseUrl}`, project);
  }

  getProjects(): Observable<any[]> {
    return this. httpClient.get<any[]>(`${this.baseUrl}`);
  }

  getProjectById(id: string): Observable<any> {
    return this. httpClient.get(`${this.baseUrl}/${id}`);
  }

  updateProject(id: string, project: any): Observable<any> {
    return this. httpClient.patch(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this. httpClient.delete(`${this.baseUrl}/${id}`);
  }
  

  

}
