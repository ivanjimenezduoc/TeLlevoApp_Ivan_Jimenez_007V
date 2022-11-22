import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Usuario{
  nomUsuario: string;
  correoUsuario:string;
  passUsuario:string;
  repassUsuario: string; 
  tarifa:string;
}

export interface rutaConductor{
  navController(arg0: string): unknown;
 
  id:string;
  correoUsuario:string;
  usuario:string;
  destino:string;
  fecha: string; 
  hora: string; 
  n_conductor:string;
  c_conductor:string;
  c_pasajeros: string; 
  valor:string;
  estado:string;
  vehiculo:string;
  tipo_pago:string;

  
}
const USERS_KEY = 'my-usuarios';  
const ROUTE_KEY = 'my-rutas';  


@Injectable({
  providedIn: 'root'
})
export class RegistrosserviceService {

  private _storage: Storage;

  constructor(private storage: Storage) { 
    this.init();
   }

   //creamos el storage de Usuarios
    async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //creamos un Usuario
  async addUsuario(dato: Usuario):Promise<any>{
   return this.storage.get(USERS_KEY).then((datos: Usuario[])=>{ 
     if(datos){
       datos.push(dato);    //agregamos un objeto al storage
       return this.storage.set(USERS_KEY,datos);
     }
     else{
       return this.storage.set(USERS_KEY, [dato]);
     }
   })
  }//findelmetodo

  //obtener todos los objetos desde el storage 
  async getUsuarios():Promise<Usuario[]>{
    return this.storage.get(USERS_KEY);
  }

   //creamos una ruta
   async addRuta(dato: rutaConductor):Promise<any>{
    return this.storage.get(ROUTE_KEY).then((datos: rutaConductor[])=>{ 
      if(datos){
        datos.push(dato);    //agregamos un objeto al storage
        return this.storage.set(ROUTE_KEY,datos);
      }
      else{
        return this.storage.set(ROUTE_KEY, [dato]);
      }
    })
   }//findelmetodo
 
   //obtener todos los objetos desde el storage 
   async getRuta():Promise<rutaConductor[]>{
     return this.storage.get(ROUTE_KEY);
     
   }

   async cancelRuta(dato: rutaConductor): Promise<any>{
    return this.storage.get(ROUTE_KEY).then((datos : rutaConductor[])=>{
      if (!datos || datos.length == 0){
        return null;
      }
      let newDato: rutaConductor[] = [];
      for (let i of datos){
        if (i.correoUsuario === dato.correoUsuario && i.destino === dato.destino  &&  (i.estado === 'pendiente' || i.estado === 'aceptado' )){
          dato.estado='cancelado'
          newDato.push(dato);
        }
        else{
          newDato.push(i);
        }
      }
      return this.storage.set(ROUTE_KEY, newDato);
    });
  }

  async cancelAllRuta(datox: rutaConductor): Promise<any>{
    return this.storage.get(ROUTE_KEY).then((datos : rutaConductor[])=>{
     
      if (!datos || datos.length == 0){
        return null;
      }


      let newDato: rutaConductor[] = [];
      for (let i of datos){
        //console.log(i.c_conductor+ ' === ' +  datox.c_conductor +' && ' +  i.estado + '=== aceptado' )
        if (i.c_conductor === datox.c_conductor  &&  i.estado === 'aceptado' ){
            
          datox.estado='cancelado'
          newDato.push(datox);
        }
        else{
          newDato.push(i);
        }
      }
      return this.storage.set(ROUTE_KEY, newDato);
    });
  }




  async aceptarRuta(dato: rutaConductor): Promise<any>{
    return this.storage.get(ROUTE_KEY).then((datos : rutaConductor[])=>{
      if (!datos || datos.length == 0){
        return null;
      }
      let newDato: rutaConductor[] = [];
      for (let i of datos){
        
        if (i.correoUsuario === dato.correoUsuario && i.destino === dato.destino  &&  i.estado === 'pendiente' ){
          
          dato.estado='aceptado'

          
          newDato.push(dato);
        }
        else{
          newDato.push(i);
        }
      }
      return this.storage.set(ROUTE_KEY, newDato);
    });
  }
}

