import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanViajePageRoutingModule } from './plan-viaje-routing.module';

import { PlanViajePage } from './plan-viaje.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlanViajePageRoutingModule
  ],
  declarations: [PlanViajePage]
})
export class PlanViajePageModule {}

