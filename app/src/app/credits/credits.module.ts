import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditsPageRoutingModule } from './credits-routing.module';

import { CreditsPage } from './credits.page';
import { CreditsService } from "./credits.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditsPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [CreditsPage],
  providers: [CreditsService]
})
export class CreditsPageModule {}
