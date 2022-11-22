import { Component,  OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { RegistrosserviceService, rutaConductor } from '../../../services/registrosservice.service';
declare const google;


@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})



export class BuscarViajePage implements OnInit {


  newRuta: rutaConductor = <rutaConductor>{};
  ruta: rutaConductor[] = [];
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  x=0;

  center: any = {
    lat: -33.5112456,
    lng: -70.7526532,
  }


  constructor(private menuController: MenuController,
    private alertController: AlertController,
    private registroService: RegistrosserviceService,
    private navController: NavController
    ) { }

  ngOnInit() {

    this.buscarViajes();
    this.loadMap();
  }

  ngAfterViewInit() {


  }


  loadMap() {


    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 14,
        center: this.center
      }
    );


    this.directionsRenderer.setMap(map);

  }

  
  calculateAndDisplayRoute(destino:string) {


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
 


  mostrarMenu() {


    if (localStorage.getItem('conductor')) {


      this.menuController.enable(false, 'pasajero');
      this.menuController.enable(true, 'conductor');
      this.menuController.open('conductor');

    } else if (localStorage.getItem('pasajero')) {

      this.menuController.enable(false, 'conductor');
      this.menuController.enable(true, 'pasajero');
      this.menuController.open('pasajero');

    }
  }
  async buscarViajes(){

    this.registroService.getRuta().then(datos => {
      this.ruta = datos;
      if (!datos || datos.length == 0) {
        return null;
      }
        
          
             })

  }

  async alertX(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    })
    await alert.present();
  }

}