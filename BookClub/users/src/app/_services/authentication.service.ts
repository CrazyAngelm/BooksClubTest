import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  returnUrl: string;
  baseUrl: string = `${environment.baseUrl}/User`;
  public user: User | null = null;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute,) {
    var rowuser = localStorage.getItem('user');
    if (rowuser !== null) {
      this.user = JSON.parse(rowuser) as User;
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(login: string, password: string) {    
    return this.http
      .post<User>(this.baseUrl + '/authenticate', {
        login: login,
        password: password,
      })
      .subscribe((responce) =>
      {
        localStorage.setItem('user', JSON.stringify(responce));
        this.user = responce as User;
        this.router.navigate([this.returnUrl]);
        window.location.reload();
      });
  }

  logout() {
    localStorage.removeItem('user');
    this.user = null; 
    this.router.navigate(['/login']);
  }
}
