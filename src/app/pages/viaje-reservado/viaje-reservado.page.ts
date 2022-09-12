import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-viaje-reservado',
  templateUrl: './viaje-reservado.page.html',
  styleUrls: ['./viaje-reservado.page.scss'],
})
export class ViajeReservadoPage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
   
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

}