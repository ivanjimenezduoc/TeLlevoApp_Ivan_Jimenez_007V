import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-new-vehiculo',
  templateUrl: './new-vehiculo.page.html',
  styleUrls: ['./new-vehiculo.page.scss'],
})
export class NewVehiculoPage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
   
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
