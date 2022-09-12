import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-plan-viaje',
  templateUrl: './plan-viaje.page.html',
  styleUrls: ['./plan-viaje.page.scss'],
})
export class PlanViajePage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
   
  }


  mostrarMenu(){
    
    this.menuController.open('first');
  }

}
