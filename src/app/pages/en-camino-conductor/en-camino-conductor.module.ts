import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnCaminoConductorPageRoutingModule } from './en-camino-conductor-routing.module';

import { EnCaminoConductorPage } from './en-camino-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnCaminoConductorPageRoutingModule
  ],
  declarations: [EnCaminoConductorPage]
})
export class EnCaminoConductorPageModule {}
