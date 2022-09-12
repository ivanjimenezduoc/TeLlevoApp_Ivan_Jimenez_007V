import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanViajePageRoutingModule } from './plan-viaje-routing.module';

import { PlanViajePage } from './plan-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanViajePageRoutingModule
  ],
  declarations: [PlanViajePage]
})
export class PlanViajePageModule {}
