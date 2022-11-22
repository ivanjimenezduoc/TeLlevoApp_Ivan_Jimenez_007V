import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistrosserviceService, Usuario, rutaConductor } from '../../../services/registrosservice.service';

@Component({
  selector: 'app-perfil-conductor',
  templateUrl: './perfil-conductor.page.html',
  styleUrls: ['./perfil-conductor.page.scss'],
})
export class PerfilConductorPage implements OnInit {

  nombre:string;
  correo:string;
  usuarios: Usuario[] = [];
  constructor(private menuController: MenuController,private router: Router,    private registroService: RegistrosserviceService,) { }

  ngOnInit() {

    this.buscar_datos();

   
  }

  navigate(){
    this.router.navigate(['/login'])
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
buscar_datos(){
  var a = 0;
  this.registroService.getUsuarios().then(datos => {
    this.usuarios = datos;
    if (!datos || datos.length == 0) {
      return null;
    }
    for (let obj of this.usuarios) {
      if (localStorage.getItem('correo_usuario')== obj.correoUsuario) {
        this.nombre= obj.nomUsuario;
        this.correo= obj.correoUsuario;
      }
    }



  })

      
}


}