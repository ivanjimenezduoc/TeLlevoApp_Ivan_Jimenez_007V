import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { RegistrosserviceService, rutaConductor } from '../../../services/registrosservice.service';
import { NavController } from '@ionic/angular';
import {
  FormGroup, FormControl, Validators, FormBuilder
} from '@angular/forms';
declare const google;



@Component({
  selector: 'app-solicitar-viaje',
  templateUrl: './solicitar-viaje.page.html',
  styleUrls: ['./solicitar-viaje.page.scss'],
  })
  export class SolicitarViajePage implements OnInit {


  formularioRuta: FormGroup;
  newRuta: rutaConductor = <rutaConductor>{};
  ruta: rutaConductor[] = [];
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  center: any = {
    lat: -33.5112456,
    lng: -70.7526532,
  }


  constructor(private menuController: MenuController,
    private alertController: AlertController,
    private registroService: RegistrosserviceService,
    private navController :NavController,
    private fb: FormBuilder) {
      this.formularioRuta = this.fb.group({
        'destino': new FormControl("", Validators.required),
        'hora': new FormControl("", Validators.required),
        'obs': new FormControl("", Validators.required),
        'pasajeros': new FormControl("", Validators.required),
        'vehiculo': new FormControl("", Validators.required)
        
      })
    }
   



  ngOnInit() {
    //this.loadMap();

  }
  ngAfterViewInit(){

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

  }
  calculateAndDisplayRoute() {/*

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
        this.directionsRenderer.setDirections(response);
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
          this.newRuta.vehiculo = form.vehiculo;
          this.newRuta.c_pasajeros = form.pasajeros;
          this.newRuta.hora = form.hora;
          this.newRuta.fecha = hoy.toLocaleDateString();;
          this.newRuta.observaciones = form.obs;
          this.newRuta.tipo = 'conductor';
          this.newRuta.estado = 'activo';
          
      
          this.registroService.addRuta(this.newRuta).then(dato => {
            this.newRuta = <rutaConductor>{};
            console.log('Ruta Creada!');
            this.navController.navigateRoot('ruta-actual');
            
          });
          
        }

      */   }




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

