import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistrosserviceService, Usuario } from '../../../services/registrosservice.service';
import { ToastController } from '@ionic/angular';
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


  constructor(private alertController: AlertController,
              private registroService: RegistrosserviceService,
              private toast: ToastController, 
              private fb:FormBuilder) {
                this.formularioRegistro = this.fb.group({
                  'nombre' : new FormControl("", Validators.required), 
                  'correo' : new FormControl("", Validators.required), 
                  'password': new FormControl("", Validators.required), 
                  'confirmaPass': new FormControl("", Validators.required)
                })
               }

  ngOnInit() {
  }

  async CrearUsuario(){
    var form = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid){
      this.alertError();
    }
    else{
    this.newUsuario.nomUsuario=form.nombre;
    this.newUsuario.correoUsuario=form.correo;
    this.newUsuario.passUsuario = form.password;
    this.newUsuario.repassUsuario=form.confirmaPass;
    this.registroService.addUsuario(this.newUsuario).then(dato=>{ 
      this.newUsuario=<Usuario>{};
      this.showToast('Usuario Creado!');
      console.log('Usuario Creado!');
    });
    this.formularioRegistro.reset();
  }
  }//findelmetodo

  async alertError(){
    const alert = await this.alertController.create({ 
      header: 'Error..',
      message: 'Debe completar todos los datos',
      buttons: ['Aceptar']
    })
    await alert.present();
  }

  async showToast(msg){
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    })
    await toast.present();
  }


}
