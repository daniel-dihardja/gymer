import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Input() name: string;
  @Input() label: string;
  @Input() parent: FormGroup;

  isInvalid(): boolean {
    const ctrl = this.parent.get(this.name)
    return ctrl.invalid && ctrl.dirty;
  }
}
