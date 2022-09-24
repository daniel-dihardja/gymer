import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { IProduct } from "../dashboard/dashboard.service";
import { TokenService } from "../token.service";

export interface ITicket {

}

@Injectable({
  providedIn: 'root'
})
export class MyTicketsServiceService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) {
  }

  getTickets(): Promise<ITicket[]> {
    return new Promise((resolve, reject) => {
      const headers = this.tokenService.getHeaders();
      this.httpClient.get(`${environment.apiUrl}/products`, { headers })
        .subscribe((e: IProduct[]) => resolve(e), error => reject(error))
    })
  }
}
