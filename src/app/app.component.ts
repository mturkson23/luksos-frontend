import { Component, OnInit } from '@angular/core';
import { Appsettings } from './models/Appsettings.model';
import { ApplicationService } from './services/application.service';
import { AuthService } from './services/auth.service';

import { Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ticking';

  public spinkit = Spinkit;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {

    this.authService.preauthenticate().then((settings: any) => {

      ApplicationService.Appsettings = settings as Appsettings;

      this.authService.saveServerUrl(settings.serverUrl)
    })
  }
}
