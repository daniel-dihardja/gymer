import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { TokenService } from "../token.service";

export interface ITicket {
  id: string,
  openDate: Date,
  price: number,
  title: string,
  description: string,
}

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) {
  }

  getTickets(): Promise<ITicket[]> {
    return new Promise((resolve, reject) => {
      const headers = this.tokenService.getHeaders();
      this.httpClient.get(`${environment.apiUrl}/tickets`, { headers })
        .subscribe((e: any) => {
          resolve(this.convertTicket(e))
        }, error => reject(error))
    })
  }

  convertTicket(data: any): ITicket[] {
    return data.map(e => {
      const ticket: ITicket = {
        id: e.id,
        openDate: e.openDate,
        price: e.price,
        title: e.product.title,
        description: e.product.description,
      }
      return ticket
    });
  }
}
