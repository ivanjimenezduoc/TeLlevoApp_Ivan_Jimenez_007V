import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnCaminoConductorPage } from './en-camino-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: EnCaminoConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnCaminoConductorPageRoutingModule {}
