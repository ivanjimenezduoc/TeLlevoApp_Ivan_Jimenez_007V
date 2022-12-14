import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistrosserviceService, rutaConductor } from '../../../services/registrosservice.service';
import { Router } from '@angular/router';

declare const google;
@Component({
  selector: 'app-en-camino',
  templateUrl: './en-camino.page.html',
  styleUrls: ['./en-camino.page.scss'],
})
export class EnCaminoPage implements OnInit {

  destino :string='';
  hora :string='';
  pago :string='';
  conductor :string='';
  tarifa :string='';
  
   directionsService = new google.maps.DirectionsService();
   directionsRenderer = new google.maps.DirectionsRenderer();

    center: any = {
      lat: -33.5112456,
      lng: -70.7526532,
    }
  
    ruta: rutaConductor[] = [];
    constructor(private menuController: MenuController
      ,public actionSheetController: ActionSheetController
      ,private router: Router
      ,private registroService: RegistrosserviceService
      ,private navController:NavController
      
      ) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
  
    this.loadMap();
  }
 
  loadMap(){


    const map = new google.maps.Map(
       document.getElementById("map5") as HTMLElement,
       {
         zoom: 14,
         center:this.center
       }
     );
      
     this.registroService.getRuta().then(datos => {
       this.ruta = datos;
       if (!datos || datos.length == 0) {
         return null;
       }
       for (let obj of this.ruta) {
        if (localStorage.getItem('correo_usuario') == obj.correoUsuario &&  obj.estado== 'iniciado') {
           
           this.destino=obj.destino;
           this.hora = obj.hora;
           this.pago = obj.tipo_pago;
           this.calculateAndDisplayRoute(obj.destino)
           this.conductor=obj.n_conductor;
           this.tarifa=obj.valor
           
           
           }
          
         }
 
       })


       this.directionsRenderer.setMap(map);

      }

      calculateAndDisplayRoute(destino:string) {
    
        if (destino=='defecto'){
          destino= this.destino
        }
    
        this.directionsService
          .route({
            origin: {
              query: 'duoc maipu',
            },
            destination: {
              query:destino,
            },
            travelMode: google.maps.TravelMode.DRIVING,
          })
          .then((response) => {
            this.directionsRenderer.setDirections(response);
          })
          .catch((e) => window.alert("Directions request failed due to " + status));
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


}

async cancelarRuta(){

  this.registroService.getRuta().then(datos => {
    this.ruta = datos;
    if (!datos || datos.length == 0) {
      return null;
    }
    for (let obj of this.ruta) {
      if (localStorage.getItem('correo_usuario') == obj.correoUsuario &&  obj.estado== 'iniciado') {
      
        obj.estado = 'cancelado';
        this.registroService.cancelRuta(obj).then(item=>{
        console.log('Elemento actualizado!')
        
        this.navController.navigateRoot('plan-viaje');
        this.router.navigate(["/plan-viaje"]);
        //this.navController.pop();
        
        });
        
        }
       
      }

    })


} 
}
