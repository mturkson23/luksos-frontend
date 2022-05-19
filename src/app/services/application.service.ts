import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retry, map } from 'rxjs/operators';
import { AlertService } from './alert-service.service';
import { Router } from '@angular/router';
import { Appsettings } from '../models/Appsettings.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  protected connectionString;

  public reloadTablesAndOverview: EventEmitter<any> = new EventEmitter<any>();

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('AUTH_TOKEN')
    })
  };


  static Appsettings: Appsettings;

  constructor(protected http: HttpClient, protected alertService: AlertService, protected router: Router) {

    this.connectionString = localStorage.getItem('SERVER_URL');
  }

  protected buildQueryString (params: any)  {

    const allParams = [...params]
    let starter = '?'

    allParams.forEach(param => {
        starter += `${param.key}=${param.value}&`
    })

    return starter.substr(0, starter.length - 1)
  }

  protected makePostFile(url: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type':  'text/plain; charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem('AUTH_TOKEN')
    })

    return this.http.post<any>(`${this.connectionString + url}`, {

    }, { headers: headers, responseType: 'text' as 'json' }).pipe(

    )
  }

  protected makeDownload(url: string, data: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type':  'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem('AUTH_TOKEN')
    })

    return this.http.post<any>(`${this.connectionString + url}`, data,
    { headers: headers, responseType: 'blob' as 'json' }).pipe(tap(data => {
      console.log(data)
    }));
  }

  protected makeGet(url: string): Observable<any> {

    const relay: any = this.http.get<any>(`${this.connectionString + url}`, this.httpOptions).pipe(
      tap(data => {
        console.log(data)
      }),
      catchError(error => this.handleError(error, this.http, relay))
    )

    return relay
  }

  get validateAppsettings() {

    if(!ApplicationService.Appsettings) {

      return false

    } else {

      this.http.get<Appsettings>('assets/appsettings.json').subscribe(settings => {

        console.log(settings)

        if(!settings || settings.serverUrl != localStorage.getItem('SERVER_URL')) {
            return false
        }

        return true
      })
    }

    return true
  }

  protected makePost(url: string, data: any): Observable<any> {

    return this.http.post<any>(`${this.connectionString + url}`, data, this.httpOptions).pipe(
      tap(data => {
        console.log(data)
      }),
      catchError(error => this.handleError(error, this.http))
    )
  }

  protected makePut(url: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.connectionString + url}`, data, this.httpOptions).pipe(
      tap(data => {
        console.log(data)
      }),
      catchError(error => this.handleError(error, this.http))
    )
  }

  handleError(error: any, http: any, relay = null) {

    console.log(this.http, 'dsaf')
    console.log(error)

    if(error.status == 401) {

      this.alertService.showInfo('Re-authenticating', 'System is performing a security check');

      const RefreshToken = localStorage.getItem('AUTH_REFRESH_TOKEN');
      const Token = localStorage.getItem('AUTH_TOKEN');
      const User: any = JSON.parse(localStorage.getItem('User') as any)
      const Username = User.Username;
      console.log(RefreshToken, Token, User)

      http.post(`${this.connectionString}/users/token/refresh`, {
        Token, RefreshToken, Username
      }, this.httpOptions).pipe(
        catchError(error => {

          this.alertService.showError('Re-authenticating Failed', 'Server was restarted, please login');

          this.router.navigateByUrl('/login')
          return throwError(error)
        })
      ).subscribe((data: any) => {
        console.log(data)
        localStorage.setItem('AUTH_TOKEN', data.Token);
        localStorage.setItem('AUTH_REFRESH_TOKEN', data.RefreshToken)

        if(relay != null) {
          // relay.pipe(
          //   retry(1)
          // )
        }

        this.alertService.showInfo('Re-authenticating successful', 'You are now re-authenticated');

        this.httpOptions.headers = new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('AUTH_TOKEN')
        })

      })
    }
    return throwError(error)
  }
}
