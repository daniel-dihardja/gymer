import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from "../shared/shared.module";

import { RegistrationPageRoutingModule } from './registration-routing.module';
import { RegistrationService } from "./registration.service";

import { RegistrationPage } from './registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  declarations: [RegistrationPage],
  providers: [
    RegistrationService
  ]
})
export class RegistrationPageModule {}
