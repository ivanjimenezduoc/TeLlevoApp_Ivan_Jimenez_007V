import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { RegistrosserviceService, rutaConductor } from '../../../services/registrosservice.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import {
  FormGroup, FormControl, Validators, FormBuilder
} from '@angular/forms';
declare const google;


@Component({
  selector: 'app-plan-viaje',
  templateUrl: './plan-viaje.page.html',
  styleUrls: ['./plan-viaje.page.scss'],
})
export class PlanViajePage implements OnInit {


  formularioRuta: FormGroup;
  newRuta: rutaConductor = <rutaConductor>{};
  ruta: rutaConductor[] = [];
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  tarifa : string;
  center: any = {
    lat: -33.5112456,
    lng: -70.7526532,
  }



  constructor(private menuController: MenuController,
    private alertController: AlertController,
    private registroService: RegistrosserviceService,
    private navController :NavController,
    private router: Router,
    private fb: FormBuilder) {
      this.formularioRuta = this.fb.group({
        'destino': new FormControl("", Validators.required),
        'hora': new FormControl("", Validators.required),
        'pasajeros': new FormControl("", Validators.required),
        'pago': new FormControl("", Validators.required),
      
        
      })
    }
   



  ngOnInit() {

   
  }
  ngAfterViewInit(){

    this.loadMap();

  }
  loadMap() {

    

    const map = new google.maps.Map(
      document.getElementById("map1") as HTMLElement,
      {
        zoom: 14,
        center: this.center
      }
    );

    console.log(map);
    console.log('Llamando mapa map');

    this.directionsRenderer.setMap(map);
    console.log('renderizando map fin')
  }
  calculateAndDisplayRoute() {

    this.directionsService
      .route({
        origin: {
          query: 'duoc maipu',
        },
        destination: {
          query: (document.getElementById("end") as HTMLInputElement).value,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        //console.log(response);
        this.directionsRenderer.setDirections(response);
        //console.log(response.routes[0].legs[0].distance.value);
  
        this.tarifa = (Math.trunc((response.routes[0].legs[0].distance.value * 900)/1000)).toString();
      })
      .catch((e) =>  this.alertX('Error', 'Direccion mal ingresada') );
  }

  async CrearRuta() {

    var x = false;

    var form = this.formularioRuta.value;
    
    if (this.formularioRuta.invalid) {
      this.alertX('Error', 'Debe completar todos los campos');
    }
    else {

          const tiempoTranscurrido = Date.now();
          const hoy = new Date(tiempoTranscurrido);
          this.newRuta.usuario =  '' +localStorage.getItem('nombre_usuario') ;
          this.newRuta.correoUsuario = '' + localStorage.getItem('correo_usuario');
          this.newRuta.destino = form.destino;
          this.newRuta.tipo_pago = form.pago;
          this.newRuta.c_pasajeros = form.pasajeros;
          this.newRuta.hora = form.hora;
          this.newRuta.fecha = hoy.toLocaleDateString();;
          this.newRuta.estado = 'pendiente';
          this.newRuta.valor = this.tarifa;
          /*this.newRuta.id = '';
          this.newRuta.n_conductor = '';
          this.newRuta.c_conductor = '';
          
          this.newRuta.vehiculo = '';*/

      
          this.registroService.addRuta(this.newRuta).then(dato => {
            this.newRuta = <rutaConductor>{};
            console.log('Ruta Creada!');
            this.navController.navigateRoot('viaje-reservado');
            
            //this.router.navigate(["/viaje-reservado"]);

            //this.navController.pop();
          });
          
        }

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


  async alertX(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    })
    await alert.present();
  }

}

