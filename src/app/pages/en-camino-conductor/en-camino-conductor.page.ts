import { Component,  OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RegistrosserviceService, rutaConductor } from '../../../services/registrosservice.service';

declare const google;

@Component({
  selector: 'app-en-camino-conductor',
  templateUrl: './en-camino-conductor.page.html',
  styleUrls: ['./en-camino-conductor.page.scss'],
})
export class EnCaminoConductorPage implements OnInit {


  destino: string = '';
  hora: string = '';
  observacion: string = '';
  titulo: string;
  activos :boolean;


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
  }

  ionViewDidEnter(){
    
   
   

  }
  ngAfterViewInit() {
  
    this.loadMap();
    this.buscarActivos();
  }

  loadMap() {


    const map = new google.maps.Map(
      document.getElementById("map6") as HTMLElement,
      {
        zoom: 14,
        center: this.center
      }
    );


    this.directionsRenderer.setMap(map);

    
  }

  buscarActivos(){
    console.log("buscando activos")
    this.activos = false;
    this.registroService.getRuta().then(datos => {
      this.ruta = datos.filter(datos  => datos.c_conductor ==  localStorage.getItem('correo_usuario'));
      if (!datos || datos.length == 0) {
        return null;
      }
      for (let obj of this.ruta) {
        if (obj.estado == 'iniciado') {
          console.log("encontrado")
          this.destino = obj.destino;
          this.hora = obj.hora;
          this.activos = true;
        }
      }

      if (!this.activos){

        console.log("no hay mas")
        this.navigate('/ruta-actual')


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
    this.router.navigate([page_])
    
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

  async cancelarUnaRuta(usuario:string,conductor:string) {

    this.registroService.getRuta().then(datos => {
      this.ruta = datos.filter(datos  => datos.c_conductor == conductor && datos.correoUsuario==usuario);

      if (!datos || datos.length == 0) {
        return null;
      }
      for (let obj of this.ruta) {

        if (obj.estado == 'iniciado') {

     
          this.registroService.cancelRuta(obj).then(item => {
          console.log('Elemento actualizado!')
          this.buscarActivos();



          });
        }
      }
    })

  }







}
