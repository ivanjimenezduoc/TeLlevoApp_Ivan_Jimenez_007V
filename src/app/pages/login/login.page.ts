import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistrosserviceService, Usuario } from '../../../services/registrosservice.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  usuarios : Usuario[] = [];

  constructor(private alertController: AlertController, 
              private navController: NavController,
              private registroService: RegistrosserviceService, 
              private fb: FormBuilder) { 
                this.formularioLogin = this.fb.group({ 
                  'correo' : new FormControl("", Validators.required),
                  'password' : new FormControl ("", Validators.required)                
                })
              }

  ngOnInit() {
  }

  async Ingresar(){
    var f = this.formularioLogin.value;
    var a=0;
    this.registroService.getUsuarios().then(datos=>{ 
      this.usuarios = datos; 
      if (!datos || datos.length==0){
        return null;
      }
      for (let obj of this.usuarios){
        if (f.correo == obj.correoUsuario && f.password==obj.passUsuario){
          a=1;

          localStorage.setItem('nombre_usuario',obj.nomUsuario);

        
         
          if(localStorage.getItem('pasajero')){

            this.navController.navigateRoot('buscar-viaje');
            localStorage.setItem('tipo_usuario','Pasajero');
    
          }else if(localStorage.getItem('conductor')){
    
            this.navController.navigateRoot('plan-viaje');
            localStorage.setItem('tipo_usuario','Conductor');
      } 

          this.bienvenida();
        }
      }
      if(a==0){
        this.alertMsg();
      }
    })
  }

  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'Error...',
      message: 'Los datos ingresados son incorrectos',
      buttons: ['Aceptar']
    })
    await alert.present();
    return;
  }

  async bienvenida(){
    const alert = await this.alertController.create({
      header: 'Bienvenido!!!',
      message: 'Bienvenido ' + localStorage.getItem('nombre_usuario') + ' Te has conectado como ' + localStorage.getItem('tipo_usuario'),
      buttons: ['Aceptar']
    })
    await alert.present();
    return;
  }



  set_user(tipo_usuario : String){

    console.log(tipo_usuario);
      if (tipo_usuario=='pasajero'){

        localStorage.clear();
        localStorage.setItem('pasajero','true');
        

      }else if(tipo_usuario=='conductor'){

        localStorage.clear();
        localStorage.setItem('conductor','true');
        
  }

}
}