// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  roles: string[] = [];
  username: any;
  accessToken!: string;

  constructor(private http: HttpClient, private router: Router) {
    this.restoreAuthState(); // restauration au démarrage
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:8085/auth/login?username=${username}&password=${password}`, {})
      .pipe(tap((data: any) => {
        this.loadProfile(data);
      }));
  }

  public loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    // Sauvegarde dans localStorage
    localStorage.setItem('access-token', this.accessToken);
    const decodedJwt: any = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    this.roles = decodedJwt.scope.split(' ');
  }

  public restoreAuthState() {
    const token = localStorage.getItem('access-token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // Vérifier si le token n'est pas expiré
        if (decoded.exp * 1000 > Date.now()) {
          this.accessToken = token;
          this.isAuthenticated = true;
          this.username = decoded.sub;
          this.roles = decoded.scope.split(' ');
        } else {
          localStorage.removeItem('access-token');
        }
      } catch (e) {
        localStorage.removeItem('access-token');
      }
    }
  }

  public logout() {
    this.isAuthenticated = false;
    this.accessToken = '';
    this.username = '';
    this.roles = [];
    localStorage.removeItem('access-token');
    this.router.navigate(['/login']);
  }

  public isAdmin(): boolean {
    return this.roles && this.roles.includes('ADMIN');
  }

  public changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`http://localhost:8085/auth/change-password`, { oldPassword, newPassword });
  }
}
