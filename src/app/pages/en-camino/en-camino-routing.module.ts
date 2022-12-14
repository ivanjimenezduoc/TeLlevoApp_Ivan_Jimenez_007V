import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnCaminoPage } from './en-camino.page';

const routes: Routes = [
  {
    path: '',
    component: EnCaminoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnCaminoPageRoutingModule {}
