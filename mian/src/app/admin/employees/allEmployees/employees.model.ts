import { Role } from '@core';
export class Employees {
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
    isActive !:  boolean ;
  }
