import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeReservadoPageRoutingModule } from './viaje-reservado-routing.module';

import { ViajeReservadoPage } from './viaje-reservado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeReservadoPageRoutingModule
  ],
  declarations: [ViajeReservadoPage]
})
export class ViajeReservadoPageModule {}
