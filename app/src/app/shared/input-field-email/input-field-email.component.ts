import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-input-field-email',
  templateUrl: './input-field-email.component.html',
  styleUrls: ['./input-field-email.component.scss']
})
export class InputFieldEmailComponent {
  @Input() name: string;
  @Input() label: string;
  @Input() parent: FormGroup;

  isInvalid(): boolean {
    const ctrl = this.parent.get(this.name)
    return ctrl.invalid && ctrl.dirty;
  }

  hasRequiredError(): boolean {
    const ctrl = this.parent.get(this.name);
    return ctrl.errors && ctrl.errors.required
  }

  hasEmailError(): boolean {
    const ctrl = this.parent.get(this.name);
    return ctrl.errors && ctrl.errors.email
  }
}
