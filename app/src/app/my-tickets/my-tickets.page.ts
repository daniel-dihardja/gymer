import { Component, OnInit } from '@angular/core';
import { MenuController } from "@ionic/angular";

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.page.html',
  styleUrls: ['./my-tickets.page.scss'],
})
export class MyTicketsPage implements OnInit {

  constructor(private menuCtrl: MenuController) {
  }

  openMenu() {
    this.menuCtrl.enable(true).then(e => this.menuCtrl.open())
  }

  ngOnInit() {
  }

}
