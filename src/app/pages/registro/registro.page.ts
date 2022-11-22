import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistrosserviceService, Usuario } from '../../../services/registrosservice.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {
  FormGroup, FormControl, Validators, FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  formularioRegistro: FormGroup;
  newUsuario: Usuario = <Usuario>{};
  usuarios: Usuario[] = [];

  constructor(private alertController: AlertController,
    private registroService: RegistrosserviceService,
    private toast: ToastController,
    private navController: NavController,
    private fb: FormBuilder) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'confirmaPass': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }



  async CrearUsuario() {

    var x = false;

    var form = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid) {
      this.alertX('Error','Debe completar todos los campos');
    }
    else {

      if (form.password == form.confirmaPass) {


        this.registroService.getUsuarios().then(datos => {
          this.usuarios = datos;

          if (this.usuarios !== null) {


            for (let obj of this.usuarios) {
              if (form.correo == obj.correoUsuario) {

                x = true;
              }
            }
          }

          if (x) {


            this.alertX('Error','El usuario ya existe');

          } else {

            this.newUsuario.nomUsuario = form.nombre;
            this.newUsuario.correoUsuario = form.correo;
            this.newUsuario.passUsuario = form.password;
            this.newUsuario.repassUsuario = form.confirmaPass;
            this.newUsuario.tarifa = '5000'
            this.registroService.addUsuario(this.newUsuario).then(dato => {
              this.newUsuario = <Usuario>{};
              this.alertX('Exito!','Usuario Creado!');
              console.log('Usuario Creado!');
              this.navController.navigateRoot('login');
            });
            this.formularioRegistro.reset();


          }

        })
      } else {

        this.alertX('Error','La contraseña reingresada no coincide');
      }


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


  async showToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    })
    await toast.present();
  }


}
