import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { TokenService } from "../token.service";

export interface IProduct {
  title: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) {
  }

  async getProducts(): Promise<IProduct[]> {
    return new Promise((resolve, reject) => {
      const headers = this.tokenService.getHeaders();
      this.httpClient.get(`${environment.apiUrl}/products`, { headers })
        .subscribe((e: IProduct[]) => resolve(e), error => reject(error))
    })
  }
}
