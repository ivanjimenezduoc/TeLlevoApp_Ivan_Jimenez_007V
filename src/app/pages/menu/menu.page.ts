import { Component, OnInit } from '@angular/core';

interface Componente{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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
      icon: 'newspaper-outline',
      name: 'Noticias',
      redirecTo: '/noticias'
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
