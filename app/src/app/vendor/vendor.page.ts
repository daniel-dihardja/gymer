import { Component, OnInit } from '@angular/core';
import { MenuController } from "@ionic/angular";

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.page.html',
  styleUrls: ['./vendor.page.scss'],
})
export class VendorPage {

  constructor(private menuCtrl: MenuController,) { }

  async openMenu():Promise<void> {
    await this.menuCtrl.open()
  }

  async ionViewDidEnter(): Promise<void> {
    await this.menuCtrl.enable(true, 'vendor');
  }

}
