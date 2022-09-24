import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from "@ionic/angular";
import { DashboardService, IProduct } from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  products: IProduct[];

  constructor(private menuCtrl: MenuController,
              private service: DashboardService,
              private alertController: AlertController,
              private toastController: ToastController) {
  }

  openMenu() {
    this.menuCtrl.enable(true).then(e => this.menuCtrl.open())
  }

  async ngOnInit() {
  }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position
    });

    await toast.present();
  }

  async ionViewDidEnter(): Promise<void> {
    await this.getProducts();
  }

  async buy(product: IProduct) {
    await this.confirm(product);
  }

  private async getProducts(): Promise<void> {
    try {
      const res = await this.service.getProducts();
      this.products = res;
    } catch (error) {
      console.error(error);
    }
  }

  async buyProduct(product: IProduct): Promise<void> {
    try {
      await this.service.buyProduct(product.id);
      const msg = `${product.title} has been added to your tickets`;
      await this.presentToast(msg, 'top');
    } catch (error) {
      console.error(error);
    }
  }

  async confirm(product: IProduct): Promise<void> {
    const alert = await this.alertController.create({
      header: `Buy ${product.title} credits for ${product.price} Credits ?`,
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
            await this.buyProduct(product);
          },
        },
      ],
    });
    await alert.present();
  }


}
