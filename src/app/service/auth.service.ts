import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  constructor(private http: HttpClient) { }
  url = 'http://127.0.0.1:3000';

  loginUser(data): Observable<any> {
    return this.http.post<any>(`${this.url}/user/login`, data);
  }

  registerUser(data): Observable<any> {
    return this.http.post<any>(`${this.url}/user/register`, data);
  }

  addProduct(data): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.post<any>(`${this.url}/product/add`, data, { headers });
  }

  getAllProducts(): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get<any>(`${this.url}/product/get`, { headers });
  }

  deleteProduct(data): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.delete<any>(`${this.url}/product/delete/${data}`, { headers });
  }

  updateProduct(data): Observable<any> {
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.put<any>(`${this.url}/product/edit`, data, { headers });
  }

  isLoggedIn() {
    if (localStorage.getItem('token') !== undefined || localStorage.getItem('token') !== null || localStorage.getItem('token') !== '') {
      return true;
    }
    return false;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }
}
