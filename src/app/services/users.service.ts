import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:8080/api/users");
  }

  public addUser(user): Observable<User> {
    return this.httpClient.post<User>("http://localhost:8080/api/users", user);
  }

  public getAdmin(): Observable<Admin> {
    return this.httpClient.get<Admin>("http://localhost:8080/api/users/admin");
  }

}
