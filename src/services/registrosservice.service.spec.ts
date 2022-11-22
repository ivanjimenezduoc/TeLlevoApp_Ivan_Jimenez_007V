import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Usuario{
  nomUsuario: string;
  correoUsuario:string;
  passUsuario:string;
  repassUsuario: string; 
}



@Injectable({
  providedIn: 'root'
})
export class RegistroserviceService {

  private _storage: Storage;

  constructor(private storage: Storage) { 
  
   }


  

}
