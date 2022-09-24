import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { TokenService } from "../token.service";

export interface IProduct {
  id: number;
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

  async buyProduct(productId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers = this.tokenService.getHeaders();
      const payload = { productId };
      this.httpClient.post(`${environment.apiUrl}/tickets`, payload, { headers })
        .subscribe(e => resolve(), error => reject(error))
    })
  }
}
