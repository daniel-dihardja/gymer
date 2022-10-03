import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { TokenService } from "../token.service";

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private tokenService: TokenService,
              private httpClient: HttpClient) {
  }

  async validateTicket(ticketId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers = this.tokenService.getHeaders();
      const dto = { ticketId };
      this.httpClient.post(`${environment.apiUrl}/tickets/validate`, dto, { headers })
        .subscribe(e => resolve(), err => reject(err));
    });
  }
}
