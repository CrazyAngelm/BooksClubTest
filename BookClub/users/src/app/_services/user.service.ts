import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = `${environment.baseUrl}/User`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: string): Observable<User> 
  {
    return this.http.get<User>(this.baseUrl + '/' + id)
  }

  addUser(user: User): Observable<User> {
      user.id = '00000000-0000-0000-0000-000000000000';
      return this.http.post<User>(this.baseUrl, user);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(this.baseUrl + '/' + id);
  }
}
