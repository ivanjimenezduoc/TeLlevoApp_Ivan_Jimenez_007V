import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnCaminoPageRoutingModule } from './en-camino-routing.module';

import { EnCaminoPage } from './en-camino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnCaminoPageRoutingModule
  ],
  declarations: [EnCaminoPage]
})
export class EnCaminoPageModule {}
