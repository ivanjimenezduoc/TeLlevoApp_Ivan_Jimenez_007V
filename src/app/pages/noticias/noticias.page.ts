import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NoticiasService } from '../../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  noticias: Article[] = [];

  constructor(private menuController: MenuController, private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.noticiasService.getTopHeadLines().subscribe(resp => {
      console.log('noticias', resp);
      this.noticias.push(...resp.articles);
    })

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
