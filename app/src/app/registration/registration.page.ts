import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { RegistrationService } from "./registration.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private service: RegistrationService,
              private alertController: AlertController,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.setupForm();
  }

  async onSubmit(): Promise<void> {
    const user = this.form.value;
    try {
      await this.service.registerUser(user);
      await this.showSuccess();
    } catch (error) {
      await this.showError(error.message);
    }
  }

  private setupForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    },{validators: [this.pwConfirmValidator()]})
  }

  public pwConfirmValidator(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const pw1 = formGroup.get('password').value;
      const pw2 = formGroup.get('passwordConfirm').value;
      if (pw1 != pw2) {
        formGroup.get('passwordConfirm').setErrors({ pwMissmatch: true});
      }
      return null;
    };
  }

  async showError(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Registration failed',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showSuccess(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Registration succeeded',
      message: 'An email was sent to you. Please click the activation link',
      buttons: ['OK'],
    });
    await alert.present();
    await alert.onDidDismiss();
    await this.router.navigate(['/login']);
  }

}
