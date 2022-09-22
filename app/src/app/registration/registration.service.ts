import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {
  }

  async registerUser(user: User): Promise<void> {
    const { passwordConfirm, ...result } = user; // get all other props but passwordConfirm
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${environment.apiUrl}/users`, result)
        .subscribe(e => resolve(), error => reject(error.error));
    })
  }
}
