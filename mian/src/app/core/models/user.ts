import { Role } from './role';
import { TasksModel } from "app/admin/projects/all-projects/core/project.model";
export class User {
  _id!: string;
  img!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  etablissement!: string;
  EmailSecondaire!: string;
  TelSecondaire!: string;
  dateEntree!: string;
  Tel!: string;
  Matricule!: string;
  password!: string;
  roleName!: Role;
  soldeConges !: number; 
  soldeMaladie !: number ;
  fonction !: string ;
  token !: string ;
   tasks?:TasksModel[]
}
