import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, MenuController, NavController } from "@ionic/angular";
import { LoginService } from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private service: LoginService,
              private alertController: AlertController,
              private menuController: MenuController,
              private router: Router) { }

  async ngOnInit() {
    this.form = this.setupForm();
    await this.menuController.enable(false);
  }

  private setupForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  async onSubmit(): Promise<void> {
    const { email, password } = this.form.value;
    try {
      await this.service.login(email, password)
      await this.router.navigate(['/dashboard'])
    } catch(error) {
      await this.showErrorMessage(error);
    }
  }

  async showErrorMessage(error): Promise<void> {
    if (error.statusCode === 401 && error.message === 'Unauthorized') {
      await this.showError('Login failed')
    }
  }

  async showError(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Registration failed',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
