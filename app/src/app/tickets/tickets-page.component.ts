import { Component, OnInit } from '@angular/core';
import { MenuController } from "@ionic/angular";
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from "@techiediaries/ngx-qrcode";
import { ITicket, TicketsService } from "./tickets.service";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets-page.component.html',
  styleUrls: ['./tickets-page.component.scss'],
})
export class TicketsPage {

  tickets: ITicket[];
  isModalOpen = false;
  selectedTicket: ITicket;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  qrCodeValue = '';

  constructor(private menuCtrl: MenuController,
              private service: TicketsService) {
  }

  async openMenu(): Promise<void> {
    await this.menuCtrl.open()
  }

  async ionViewDidEnter(): Promise<void> {
    await this.menuCtrl.enable(true, 'first')
    await this.getTickets();
  }

  setOpenModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async getTickets(): Promise<void> {
    try {
      const res = await this.service.getTickets();
      this.tickets = res;
    } catch(error) {
      console.error(error);
    }
  }

  showQRCode(ticket: ITicket): void {
    this.selectedTicket = ticket;
    this.qrCodeValue = JSON.stringify({code: ticket.id});
    this.setOpenModal(true);
  }
}
