import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { TokenService } from "../token.service";


export interface IAuth {
  access_token: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService) {
  }

  async login(username: string, password: string): Promise<IAuth> {
    return new Promise((resolve, reject) => {
      const payload = { username, password };
      this.httpClient.post(`${environment.apiUrl}/auth/login`, payload)
        .subscribe((e: IAuth) => {
          this.tokenService.setToken(e.access_token)
          resolve(e)
        }, error => reject(error.error));
    })
  }
}
