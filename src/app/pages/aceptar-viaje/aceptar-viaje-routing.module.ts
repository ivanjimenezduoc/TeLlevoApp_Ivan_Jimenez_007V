import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AceptarViajePage } from './aceptar-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: AceptarViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AceptarViajePageRoutingModule {}
