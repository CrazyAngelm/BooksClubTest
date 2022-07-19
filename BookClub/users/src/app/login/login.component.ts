import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { User } from '../models/user.model';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css'],
})
export class LoginComponent implements OnInit {
  isRequired = false;
  isCorrect = false;

  title = 'users';
  users: User[] = [];
  user: User = {
    id: '',
    login: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    if (this.authenticationService.user) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}

  onClickSignUp() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    this.isRequired = false;

    if (this.user.login === '' || this.user.password === '') {
      this.isRequired = true;
      throw new Error('login and password are required!');
    }

    this.authenticationService.login(this.user.login, this.user.password);

    this.user = {
      id: '',
      login: '',
      password: '',
    };

    this.isCorrect = false;
    if(this.authenticationService.user === null)
    {
      this.isCorrect = true;
      throw new Error('login or password is not correct!');
    }
  }
}
