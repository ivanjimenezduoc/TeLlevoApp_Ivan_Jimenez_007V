import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-conductor',
  templateUrl: './perfil-conductor.page.html',
  styleUrls: ['./perfil-conductor.page.scss'],
})
export class PerfilConductorPage implements OnInit {

  constructor(private menuController: MenuController,private router: Router) { }

  ngOnInit() {
   
  }

  navigate(){
    this.router.navigate(['/login'])
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

}