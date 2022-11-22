import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RegistrosserviceService, rutaConductor } from '../../../services/registrosservice.service';

declare const google;


@Component({
  selector: 'app-ruta-actual',
  templateUrl: './ruta-actual.page.html',
  styleUrls: ['./ruta-actual.page.scss'],
})
export class RutaActualPage implements OnInit {

  destino: string = '';
  hora: string = '';
  observacion: string = '';

  pendientes: string;
  x:boolean;

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  center: any = {
    lat: -33.5112456,
    lng: -70.7526532,
  }

  ruta: rutaConductor[] = [];
  constructor(private menuController: MenuController
    , public actionSheetController: ActionSheetController
    , private router: Router
    , private registroService: RegistrosserviceService
    , private navController: NavController

  ) { }

  ngOnInit() {
    //this.loadMap();

  }

  ngAfterViewInit() {
    this.buscarPendientes();
    this.loadMap();
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

    this.registroService.getRuta().then(datos => {
      this.ruta = datos.filter(datos  => datos.c_conductor ==  localStorage.getItem('correo_usuario'));
      if (!datos || datos.length == 0) {
        return null;
      }
      for (let obj of this.ruta) {
        if (obj.estado == 'aceptado') {
          
          this.x=true;
          console.log('encontrado');
          this.destino = obj.destino;
          this.hora = obj.hora;

        }
      }

    })



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

  navigate(page_: string) {
    console.log(page_)
    this.router.navigate([page_])
  }

  buscarPendientes() {

    this.registroService.getRuta().then(datos => {
      this.ruta = datos;
      var cont = 0;
      if (!datos || datos.length == 0) {
        this.pendientes = '0';
      } else {
        for (let r of this.ruta) {
          if (r.estado == 'pendiente') {
            cont = cont + 1
          }
        }
        this.pendientes = cont.toString();
        
      }
    })
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

  async cancelarRuta() {

    this.registroService.getRuta().then(datos => {
      this.ruta = datos.filter(datos  => datos.c_conductor ==  localStorage.getItem('correo_usuario'));

      if (!datos || datos.length == 0) {
        return null;
      }
      for (let obj of this.ruta) {

        if (obj.estado == 'aceptado') {

     
          this.registroService.cancelAllRuta(obj).then(item => {
          console.log('Elemento actualizado!')
          //this.navController.navigateRoot('plan-viaje');
          

          });
        }
      }
    })
    this. buscarPendientes();
  }

  async cancelarUnaRuta(usuario:string,conductor:string) {

    this.registroService.getRuta().then(datos => {
      this.ruta = datos.filter(datos  => datos.c_conductor == conductor && datos.correoUsuario==usuario);

      if (!datos || datos.length == 0) {
        return null;
      }
      for (let obj of this.ruta) {

        if (obj.estado == 'aceptado') {

     
          this.registroService.cancelRuta(obj).then(item => {
          console.log('Elemento actualizado!')
          //this.navController.navigateRoot('plan-viaje');
          

          });
        }
      }
    })
    this. buscarPendientes();
  }








}