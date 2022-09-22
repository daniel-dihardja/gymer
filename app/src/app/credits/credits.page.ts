import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AlertController, MenuController } from "@ionic/angular";
import { CreditsService } from "./credits.service";

@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
})
export class CreditsPage implements OnInit {

  creditsTotal: number;
  form: FormGroup;
  price: number;

  constructor(private creditsService: CreditsService,
              private menuCtrl: MenuController,
              private fb: FormBuilder,
              private alertController: AlertController) {
  }

  ngOnInit() {
    this.form = this.setupForm();
    this.form.get('amount').valueChanges
      .subscribe((e: number) => this.price = e * 1); // hardcoded price 1:1
  }

  openMenu() {
    this.menuCtrl.enable(true).then(e => this.menuCtrl.open())
  }

  setupForm(): FormGroup {
    this.price = 10;
    return this.fb.group({
      amount: [10]
    });
  }

  async onSubmit(): Promise<void> {
    await this.confirm();
  }

  async ionViewDidEnter(): Promise<void> {
    await this.updateCreditsValue();
  }

  async updateCreditsValue(): Promise<void> {
    try {
      const credits = await this.creditsService.getCredits();
      this.creditsTotal = credits.total;
    } catch (error) {
      console.error(error);
    }
  }

  async buyCredits(amount: number): Promise<void> {
    try {
      await this.creditsService.buyCredits(amount);
    } catch (error) {
      console.error(error);
    }
  }

  async confirm(): Promise<void> {
    const amount = this.form.get('amount').value;
    const alert = await this.alertController.create({
      header: `Buy ${amount} credits for ${this.price}€ ?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            await this.buyCredits(amount);
            await this.updateCreditsValue();
          },
        },
      ],
    });
    await alert.present();
  }
}
