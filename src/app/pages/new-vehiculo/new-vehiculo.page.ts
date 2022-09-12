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
    this.menuController.open('first');
  }

}
