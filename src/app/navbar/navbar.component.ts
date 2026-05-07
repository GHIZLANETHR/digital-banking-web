// navbar.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  // non-standalone, déclaré dans AppModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})
export class NavbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Force la détection de changement après que le service ait restauré l'état (si localStorage)
    this.authService.restoreAuthState(); // Nouvelle méthode (optionnelle)
    // Alternative : utiliser setTimeout ou Promise.resolve
    Promise.resolve().then(() => {
      this.cdr.detectChanges();
    });
  }
}
