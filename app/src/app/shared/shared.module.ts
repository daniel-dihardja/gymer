import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { InputFieldEmailComponent } from "./input-field-email/input-field-email.component";
import { InputFieldPwConfirmComponent } from "./input-field-pw-confirm/input-field-pw-confirm.component";
import { InputFieldComponent } from "./input-field/input-field.component";

@NgModule({
  declarations: [
    InputFieldComponent,
    InputFieldEmailComponent,
    InputFieldPwConfirmComponent
  ],
  exports: [
    InputFieldComponent,
    InputFieldEmailComponent,
    InputFieldPwConfirmComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
