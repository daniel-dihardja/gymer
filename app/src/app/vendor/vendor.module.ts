import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { VendorPageRoutingModule } from './vendor-routing.module';
import { VendorPage } from './vendor.page';
import { VendorService } from "./vendor.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorPageRoutingModule,
    ZXingScannerModule,
    HttpClientModule
  ],
  declarations: [VendorPage],
  providers: [VendorService]
})
export class VendorPageModule {
}
