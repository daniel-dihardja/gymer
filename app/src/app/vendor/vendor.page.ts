import { Component } from '@angular/core';
import { AlertController, MenuController } from "@ionic/angular";
import { VendorService } from "./vendor.service";

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.page.html',
  styleUrls: ['./vendor.page.scss'],
})
export class VendorPage {

  scannerEnabled = false
  scanResult: string;

  constructor(private menuCtrl: MenuController,
              private alertController: AlertController,
              private service: VendorService) {
  }

  async openMenu(): Promise<void> {
    await this.menuCtrl.open()
  }

  async ionViewDidEnter(): Promise<void> {
    await this.menuCtrl.enable(true, 'vendor');
  }

  enableScanner(): void {
    this.scannerEnabled = true;
  }

  disableScanner(): void {
    this.scannerEnabled = false;
  }

  async onScanSuccess(qrCodeData: string): Promise<void> {
    this.scannerEnabled = false;
    const ticket = JSON.parse(qrCodeData);
    await this.validateTicket(ticket.id);
  }

  async validateTicket(ticketId: string): Promise<void> {
    try {
      await this.service.validateTicket(ticketId);
      await this.presentAlert('Success!')
    } catch (error) {
      console.error(error.error);
      await this.presentAlert('Invalid')
    }
  }

  async presentAlert(statusMessage: string) {
    const alert = await this.alertController.create({
      header: 'Ticket Status',
      message: statusMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
