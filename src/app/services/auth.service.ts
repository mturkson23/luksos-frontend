import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AppService {

  constructor(private http: HttpClient) {
    super()
  }

  public login(username: string, password: string) {

    return this.http.post(`${this.baseURL}/login`, {
      username,
      password
    })
  }

  public signUp(username: string, password: string) {

    return this.http.post(`${this.baseURL}/signup`, {
      username,
      password
    })
  }
}
