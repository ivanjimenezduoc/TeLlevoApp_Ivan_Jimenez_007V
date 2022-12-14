import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { RegistrosserviceService, rutaConductor } from '../../../services/registrosservice.service';
declare const google;


@Component({
  selector: 'app-aceptar-viaje',
  templateUrl: './aceptar-viaje.page.html',
  styleUrls: ['./aceptar-viaje.page.scss'],
})
export class AceptarViajePage implements OnInit {
  newRuta: rutaConductor = <rutaConductor>{};
  ruta: rutaConductor[] = [];
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  x = 0;

  center: any = {
    lat: -33.5112456,
    lng: -70.7526532,
  }


  constructor(private menuController: MenuController,
    private alertController: AlertController,
    private registroService: RegistrosserviceService,
    private navController: NavController,
    private router: Router
  ) { }
  ngOnInit() {

    this.buscarViajes();
    this.loadMap();
  }

  ngAfterViewInit() {


  }


  loadMap() {


    const map = new google.maps.Map(
      document.getElementById("map4") as HTMLElement,
      {
        zoom: 14,
        center: this.center
      }
    );


    this.directionsRenderer.setMap(map);

  }


  calculateAndDisplayRoute(destino: string) {


    this.directionsService
      .route({
        origin: {
          query: 'duoc maipu',
        },
        destination: {
          query: destino,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        this.directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }

  async buscarViajes() {

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

  async aceptarRuta(correo: string, destino: string) {

    this.registroService.getRuta().then(datos => {
      this.ruta = datos;
      if (!datos || datos.length == 0) {
        return null;
      }
      for (let obj of this.ruta) {
        // console.log(correo+ ' == ' + obj.correoUsuario + ' && ' +  obj.estado + ' ==  pendiente  && ' +  obj.destino + ' == ' +  destino)
        if (correo == obj.correoUsuario && obj.estado == 'pendiente' && obj.destino == destino) {

          //obj.estado = 'aceptado';
          //obj.valor = '$5000'
          obj.c_conductor = '' + localStorage.getItem('correo_usuario');
          obj.n_conductor = '' + localStorage.getItem('nombre_usuario');
          this.registroService.aceptarRuta(obj).then(item => {
            console.log('Elemento actualizado!')
            //this.buscarViajes();


          });

        }

      }

    })
    //this.navController.navigateRoot('ruta-actual');
    this.router.navigate(['/ruta-actual'])
  }



}
