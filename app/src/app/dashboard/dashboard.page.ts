import { Component, OnInit } from '@angular/core';
import { MenuController } from "@ionic/angular";
import { DashboardService, IProduct } from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  products: IProduct[];

  constructor(private menuCtrl: MenuController,
              private service: DashboardService) { }

  openMenu() {
    this.menuCtrl.enable(true).then(e => this.menuCtrl.open())
  }

  async ngOnInit() {}

  async ionViewDidEnter(): Promise<void> {
    await this.getProducts();
  }

  private async getProducts(): Promise<void> {
    try {
      const res = await this.service.getProducts();
      this.products = res;
    } catch(error) {
      console.error(error);
    }
  }


}
