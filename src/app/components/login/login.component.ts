import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'Administrador' && this.password === 'Admin123') {
      localStorage.setItem('user', this.username);
      this.router.navigate(['/usuarios']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
      alert(this.errorMessage);
    }
  }
  
}
