import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from "../shared/shared.module";

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';
import { ForgotPasswordService } from "./forgot-password.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [ForgotPasswordPage],
  providers: [ForgotPasswordService]
})
export class ForgotPasswordPageModule {
}
