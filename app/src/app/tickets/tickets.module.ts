import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxQRCodeModule } from "@techiediaries/ngx-qrcode";

import { TicketsPage } from './tickets-page.component';

import { TicketsPageRoutingModule } from './tickets-routing.module';
import { TicketsService } from "./tickets.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsPageRoutingModule,
    HttpClientModule,
    NgxQRCodeModule
  ],
  declarations: [TicketsPage],
  providers: [TicketsService]
})
export class TicketsPageModule {
}
