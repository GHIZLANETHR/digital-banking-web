import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: string;

  constructor(private http: HttpClient, private router: Router) {}

  public login(username: string, password: string) {
    return this.http.post(
      `http://localhost:8085/auth/login?username=${username}&password=${password}`,
      {}
    );
  }

  public loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    const decodedJwt: any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope.split(' ');
  }

  public logout() {
    this.isAuthenticated = false;
    this.accessToken = '';
    this.username = '';
    this.roles = [];
    this.router.navigate(['/login']);
  }

  public isAdmin(): boolean {
    return this.roles && this.roles.includes('ADMIN');
  }
}
