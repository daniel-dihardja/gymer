import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { TokenService } from "../token.service";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) {}

  async createRecoveryCode(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers = this.tokenService.getHeaders();
      const payload = { email };
      this.httpClient.post(`${environment.apiUrl}/recovery`, payload, { headers })
        .subscribe(e => resolve(), error => reject(error))
    })
  }

  async createNewPassword(email: string, password: string, recoveryCode: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers = this.tokenService.getHeaders();
      const payload = { email, password, recoveryCode };
      this.httpClient.post(`${environment.apiUrl}/password`, payload, { headers })
        .subscribe(e => resolve(), error => reject(error))
    })
  }
}


