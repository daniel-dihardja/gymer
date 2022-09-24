import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPage } from "../dashboard/dashboard.page";

import { VendorPage } from './vendor.page';

const routes: Routes = [
  {
    path: '',
    component: VendorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorPageRoutingModule {}
