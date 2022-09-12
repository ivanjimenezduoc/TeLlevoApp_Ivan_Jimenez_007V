import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {
   
  }


  mostrarMenu(){
    
    this.menuController.open('first');
  }

}