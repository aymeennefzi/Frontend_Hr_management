import { Injectable } from '@angular/core';
import { User } from '@core';
import { Adapter } from './adapters';
export enum TypeStatutProjet {
  NOUVEAU = 0,
  RUNNING = 1,

  FINISHED = 3,
}
export enum TypeStatutTache{
  A_FAIRE = 'à faire',
  RUNNING = 'RUNNING',
  FINISHED = 'FINISHED',
}

export enum ProjectStatus {
  NOUVEAU = 0,
  RUNNING = 1,

  FINISHED = 3,
}

export enum ProjectPriority {
  LOW = -1,
  MEDIUM = 0,
  HIGH = 1,
}
export enum taskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
export enum ProjectType {
  WEB = 'Website',
  ANDROID = 'Android',
  IPHONE = 'IPhone',
  TESTING = 'Testing',
}

export class Project {
  constructor(
    public id: number,
    public name: string,
    public status: number = ProjectStatus.NOUVEAU,
    public description?: string,
    public deadline?: Date,
    public priority: number = ProjectPriority.MEDIUM,
    public open_task?: number,
    public type: string = ProjectType.WEB,
    public created?: Date,
    public team_leader?: string,
    public comments?: number,
    public bugs?: number,
    public progress?: number
  ) {}
}

@Injectable({
  providedIn: 'root',
})

export class ProjectMdel {
  _id!:string;
  NomProject!: string;
description?: string;
StartDate?: Date;
FinishDate?: Date;
statut?: TypeStatutProjet;
projectUrl?: string;
tasks?: TasksModel[];
NomChefProjet?: string;
priority?: ProjectPriority ;
progress?:number;
type?:ProjectType
}
export class TasksModel {
  _id?:string
  NomTask!: string;
  description?: string;
  startDate?: Date; // Assuming you want to store dates as strings
  FinishDate?: Date; // Assuming you want to store dates as strings
  statut?:TypeStatutTache;
  projectId!: string;
  priority?: taskPriority ;
  employeeAffected!: string;
}
