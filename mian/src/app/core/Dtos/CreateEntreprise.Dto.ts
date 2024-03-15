export interface DomainDto {
    NomService?: string;
    Description?: string;
  }
  
  export interface CreateEntrepriseDto {
    NomEntreprise: string;
    secteurEntreprise?: string;
    numeroTelephone?: string;
    adresse?: string;
    typeEntreprise?: string;
    email: string;
    domaines?: DomainDto[];
    codePostal?: string;
    CEO: string;
    NumeroRegistreCommercial: string;
  }
  