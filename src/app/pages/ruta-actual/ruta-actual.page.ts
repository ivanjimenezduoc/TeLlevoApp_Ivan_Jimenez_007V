import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta-actual',
  templateUrl: './ruta-actual.page.html',
  styleUrls: ['./ruta-actual.page.scss'],
})
export class RutaActualPage implements OnInit {

  constructor(private menuController: MenuController
    ,public actionSheetController: ActionSheetController
    ,private router: Router
    
    ) { }

  ngOnInit() {
   
  }

  navigate(page_ :string){
    this.router.navigate([page_])
  }


  mostrarMenu(){
    this.menuController.open('first');
    
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones del viaje',
      buttons: [
        /*{
          text: 'Ver Solicitudes',
          icon: 'person-circle',
          id: 'ver-solicitudes',
          cssClass:"b-action-solicitudes",
           handler: () => {
                this.navigate()
               }
          
        },*/
        {
          text: 'Iniciar Viaje',
          icon: 'checkmark-circle',
          id: 'iniciar-button',
          cssClass:"b-action-iniciar"
          
        },
        {
        text: 'Cancelar Viaje',
        icon: 'alert-circle',
        id: 'cancelar-button',
        cssClass:"b-action-cancelar",
        handler: () => {
          this.navigate('/plan-viaje')
         }
       
        
        
      }, {
        text: 'Salir',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
  

}