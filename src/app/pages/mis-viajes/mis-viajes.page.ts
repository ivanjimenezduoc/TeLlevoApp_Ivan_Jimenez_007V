import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.page.html',
  styleUrls: ['./mis-viajes.page.scss'],
})
export class MisViajesPage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
   
  }

  mostrarMenu(){
    this.menuController.open('end');
  }

}
