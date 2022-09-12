import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-aceptar-viaje',
  templateUrl: './aceptar-viaje.page.html',
  styleUrls: ['./aceptar-viaje.page.scss'],
})
export class AceptarViajePage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {

  }

  mostrarMenu() {
    this.menuController.open('first');
  }


  /*
  mostrarMenu(usuario: string) {

    if (usuario == 'pasajero') 
{
  this.menuController.open('first');
} 
else 
{
  this.menuController.open('menu2');
}


  }
*/
}
