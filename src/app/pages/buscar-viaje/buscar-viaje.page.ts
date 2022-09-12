import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
   
  }

  mostrarMenu(){
    this.menuController.open('end');
  }

}