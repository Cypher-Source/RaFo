import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenamepopupPage } from './renamepopup.page';

const routes: Routes = [
  {
    path: '',
    component: RenamepopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenamepopupPageRoutingModule {}
