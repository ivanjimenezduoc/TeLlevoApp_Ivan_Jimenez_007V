import { Component } from '@angular/core';

interface Componente{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}


  componentes : Componente[] = [
    {
      
      icon: 'person-outline',
      name: 'Mi Perfil',
      redirecTo: '/perfil-conductor'
    },
    {
      icon: 'navigate-outline',
      name: 'Mis Recorridos',
      redirecTo: '/mis-viajes'
    },
    {
      icon: 'search-circle-outline',
      name: 'Buscar Viajes',
      redirecTo: '/buscar-viaje'
    },
    {
      icon: 'newspaper-outline',
      name: 'Noticias',
      redirecTo: '/noticias'
    },
    {
      icon: 'navigate-outline',
      name: 'Mis Viajes Pasajero',
      redirecTo: '/mis-viajes'
    },
    {
      icon: 'help-circle-outline',
      name: 'Preguntas frecuentes',
      redirecTo: '/faq'
    },

  ];
  

logout(){

localStorage.clear();


}



}
