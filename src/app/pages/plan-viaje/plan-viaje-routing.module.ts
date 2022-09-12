import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanViajePage } from './plan-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: PlanViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanViajePageRoutingModule {}
