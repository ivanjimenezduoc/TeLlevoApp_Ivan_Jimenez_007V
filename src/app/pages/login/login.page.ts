import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistrosserviceService, Usuario, rutaConductor } from '../../../services/registrosservice.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  usuarios: Usuario[] = [];
  ruta: rutaConductor[] = [];


  constructor(private alertController: AlertController,
    private navController: NavController,
    private registroService: RegistrosserviceService,
    private fb: FormBuilder) {
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
    localStorage.clear();
  }

  async Ingresar() {
    var f = this.formularioLogin.value;
    var a = 0;


    if (localStorage.getItem('pasajero') || localStorage.getItem('conductor')) {

      this.registroService.getUsuarios().then(datos => {
        this.usuarios = datos;
        if (!datos || datos.length == 0) {
          return null;
        }
        for (let obj of this.usuarios) {
          if (f.correo == obj.correoUsuario && f.password == obj.passUsuario) {
            a = 1;

            localStorage.setItem('nombre_usuario', obj.nomUsuario);
            localStorage.setItem('correo_usuario', obj.correoUsuario);

            if (localStorage.getItem('pasajero')) {

              localStorage.setItem('tipo_usuario', 'Pasajero');


              var x = 0;


              this.registroService.getRuta().then(datos => {
                this.ruta = datos;
                if (!datos || datos.length == 0) {
                  this.navController.navigateRoot('plan-viaje');
                }

                
                for (let r of this.ruta) {
                  //console.log(r.correoUsuario + ' == ' +  localStorage.getItem('correo_usuario') +' && ('+ (r.estado  + ' == pendiente')+ ' || ' + r.estado  + ' ==  aceptado)')
                  if (r.correoUsuario == localStorage.getItem('correo_usuario') && ((r.estado == 'pendiente') || r.estado=='aceptado')) {
                   // console.log('encontrado')
                    x = 1;
                    

                  }

                }

                //console.log(x);

                if (x == 1) {
                  this.navController.navigateRoot('viaje-reservado');
                } else {
                 
                  this.navController.navigateRoot('plan-viaje');
                }

              })
            } else if (localStorage.getItem('conductor')) {

              localStorage.setItem('tipo_usuario', 'Conductor');
              this.navController.navigateRoot('ruta-actual');

            }

            this.bienvenida();

          }
        }
        if (a == 0) {


          this.alertMsg();
        }
      })

    } else {

      this.selec();

    }


  }



  async alertMsg() {
    const alert = await this.alertController.create({
      header: 'Error...',
      message: 'Los datos ingresados son incorrectos',
      buttons: ['Aceptar']
    })
    await alert.present();
    return;
  }

  async selec() {
    const alert = await this.alertController.create({
      header: 'Error...',
      message: 'Debe seleccionar si es conductor o pasajero',
      buttons: ['Aceptar']
    })
    await alert.present();
    return;
  }

  async bienvenida() {
    const alert = await this.alertController.create({
      header: 'Bienvenido!!!',
      message: 'Bienvenido ' + localStorage.getItem('nombre_usuario') + ' Te has conectado como ' + localStorage.getItem('tipo_usuario'),
      buttons: ['Aceptar']
    })
    await alert.present();
    return;
  }



  set_user(tipo_usuario: String) {



    if (tipo_usuario == 'pasajero') {

      localStorage.clear();
      localStorage.setItem('pasajero', 'true');

    }

    if (tipo_usuario == 'conductor') {

      localStorage.clear();
      localStorage.setItem('conductor', 'true');

    }

  }
}