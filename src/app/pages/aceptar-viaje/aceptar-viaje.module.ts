import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceptarViajePageRoutingModule } from './aceptar-viaje-routing.module';

import { AceptarViajePage } from './aceptar-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceptarViajePageRoutingModule
  ],
  declarations: [AceptarViajePage]
})
export class AceptarViajePageModule {}
