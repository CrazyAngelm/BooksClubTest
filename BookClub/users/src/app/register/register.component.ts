import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Register } from '../models/register.model';
import { User } from '../models/user.model';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css']
})
export class RegisterComponent implements OnInit {
  isRequired = false;
  isRepeatPassword = false;

  users: User[] = [];
  user: User = {
    id: '',
    login: '',
    password: '',
  };

  register: Register = {
    login: '',
    password: '',
    repeatPassword: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) 
    {
    }

  ngOnInit(): void {
    this.getAllUsers();
  }

  onClickLogin()
  {
    this.router.navigate(['/login']);
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((responce) => {
      this.users = responce;
    });
  }

  onSubmit() {
    this.isRepeatPassword = false;
    this.isRequired = false;

    if(this.register.password !== this.register.repeatPassword)
    {
      this.isRepeatPassword = true;
      throw new Error("Password and RepeatPassword are different!");
    }

    if(this.register.login === '' || this.register.password === '' || this.register.repeatPassword === '')
    {
      this.isRequired = true;
      throw new Error("login, password and repeatPassword are required!");
    }

    this.user = {
        id: '',
        login: this.register.login,
        password: this.register.password,
    };

    this.userService.addUser(this.user).subscribe((response) => {
        this.authenticationService.login(this.user.login, this.user.password);
        this.register = {
            login: '',
            password: '',
            repeatPassword: '',
        };
    }, (error) =>
    {
        throw error;
    });
  }
}
