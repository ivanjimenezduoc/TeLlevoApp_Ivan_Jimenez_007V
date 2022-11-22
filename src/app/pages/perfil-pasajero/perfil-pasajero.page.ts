import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-pasajero',
  templateUrl: './perfil-pasajero.page.html',
  styleUrls: ['./perfil-pasajero.page.scss'],
})
export class PerfilPasajeroPage implements OnInit {


  constructor(private menuController: MenuController,private router: Router) { }

  ngOnInit() {
   
  }

  navigate(){
    this.router.navigate(['/login'])
  }

  mostrarMenu(){
  
    
    if (localStorage.getItem('conductor')) {
              
 
      this.menuController.enable(false,'pasajero');
      this.menuController.enable(true,'conductor');
      this.menuController.open('conductor');     

    } else if (localStorage.getItem('pasajero')) {
        
    this.menuController.enable(false,'conductor');
    this.menuController.enable(true,'pasajero');
    this.menuController.open('pasajero');
      
    }


}}