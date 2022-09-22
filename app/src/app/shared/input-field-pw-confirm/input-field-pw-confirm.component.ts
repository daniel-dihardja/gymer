import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-input-field-pw-confirm',
  templateUrl: './input-field-pw-confirm.component.html',
  styleUrls: ['./input-field-pw-confirm.component.scss'],
})
export class InputFieldPwConfirmComponent {

  @Input() parent: FormGroup;
  @Input() namePwd: string;
  @Input() labelPwd: string;
  @Input() namePwdConfirm: string;
  @Input() labelPwdConfirm: string;

  constructor() {
  }

  isRequiredError(): boolean {
    const ctrl = this.parent.get(this.namePwdConfirm);
    return ctrl && ctrl.errors && ctrl.errors.required;
  }

  isMissmatchError(): boolean {
    const ctrl = this.parent.get(this.namePwdConfirm);
    return ctrl && ctrl.errors && ctrl.errors.pwMissmatch;
  }

  hasPwConfirmErrors(): boolean {
    const ctrl = this.parent.get(this.namePwdConfirm);
    if (ctrl.errors) {
      return ctrl.dirty && ctrl.errors.pwMissmatch;
    }
    return false;
  }

  hasPwErrors(): boolean {
    const ctrl = this.parent.get(this.namePwd);
    if (ctrl.errors) {
      return ctrl.dirty && ctrl.errors.required;
    }
    return false;
  }

}
