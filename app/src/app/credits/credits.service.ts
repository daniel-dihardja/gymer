import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { TokenService } from "../token.service";

export interface ICredits {
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) {
  }

  async getCredits(): Promise<ICredits> {
    return new Promise((resolve, reject) => {
      const headers = this.tokenService.getHeaders();
      this.httpClient.get(`${environment.apiUrl}/credits`, { headers })
        .subscribe((e: ICredits) => resolve(e), error => reject(error))
    })
  }

  async buyCredits(amount: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const payload = { amount };
      const headers = this.tokenService.getHeaders();
      this.httpClient.post(`${environment.apiUrl}/credits`, payload, { headers })
        .subscribe(e => resolve(), err => reject(err));
    });
  }
}
