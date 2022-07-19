import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User | null = null;

  constructor(private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.user;
  }

  logout() {
    this.authenticationService.logout();
    window.location.reload();
  }
}
