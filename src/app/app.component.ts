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
      icon: 'navigate-outline',
      name: 'Mis Viajes Pasajero',
      redirecTo: '/mis-viajes'
    },
    {
      icon: 'help-circle-outline',
      name: 'Preguntas frecuentes',
      redirecTo: '/faq'
    },
    {
      icon: 'log-out-outline',
      name: 'Cerrar Sesion',
      redirecTo: '/login'
    },
  ];
  
  componentes2 : Componente[] = [
    {
      
      icon: 'person-outline',
      name: 'opciones 2',
      redirecTo: '/login'
    },
  ];

  conductor = true;  


}
