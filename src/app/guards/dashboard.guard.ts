import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert-service.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements  CanActivateChild {

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) {

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {

    if(!this.authService.isAuthenticated()) {
      return this.router.navigateByUrl('/login')
    }

    // if(this.authService.currentUser().Role == null) {
    //   this.alertService.showWarning('NOT AUTHORIZED', 'You have not been assigned a role, Please contact administrator')
    //   this.authService.logOut().subscribe(() => {
    //     localStorage.clear();
    //     return this.authService.navigateToLogin();
    //   })
    // }
    return this.authService.isAuthenticated();
  }

}
