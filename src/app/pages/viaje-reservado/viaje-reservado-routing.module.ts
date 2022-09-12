import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajeReservadoPage } from './viaje-reservado.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeReservadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajeReservadoPageRoutingModule {}
