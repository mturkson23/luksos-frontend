import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    path: ActivatedRouteSnapshot[] | undefined;
    route: ActivatedRouteSnapshot | undefined;

    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate() {
        if(this.authService.isAuthenticated()) {
            this.router.navigate(['/dashboard'])
        }

        return !this.authService.isAuthenticated();
    }

}
