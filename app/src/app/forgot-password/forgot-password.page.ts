import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { ForgotPasswordService } from "./forgot-password.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  formEmail: FormGroup;
  formNewPwd: FormGroup;
  showNewPasswordForm = false;

  constructor(private fb: FormBuilder,
              private service: ForgotPasswordService,
              private alertController: AlertController,
              private router: Router) {}

  ngOnInit() {
    this.formEmail = this.setupFormEmail();
    this.formNewPwd = this.setupFormNewPwd();
  }

  private setupFormEmail(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  private setupFormNewPwd(): FormGroup {
    return this.fb.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      code: ['', Validators.required],
    }, { validators: [this.pwConfirmValidator()] })
  }

  public pwConfirmValidator(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const pw1 = formGroup.get('password').value;
      const pw2 = formGroup.get('passwordConfirm').value;
      if (pw1 != pw2) {
        formGroup.get('passwordConfirm').setErrors({ pwMissmatch: true });
      }
      return null;
    };
  }

  async onSubmit(): Promise<void> {
    const email = this.formEmail.get('email').value
    try {
      await this.service.createRecoveryCode(email)
      this.showNewPasswordForm = true;
    } catch(error) {
      console.error(error);
    }
  }

  async onSubmitNewPwd(): Promise<void> {
    const email = this.formEmail.get('email').value;
    const pwd = this.formNewPwd.get('password').value;
    const code = this.formNewPwd.get('code').value;
    try {
      await this.service.createNewPassword(email, pwd, code);
      await this.router.navigate(['/login']);
    } catch(error) {
      console.error(error);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Ticket Status',
      message: 'An email with a recovery code has been sent to your email address',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
