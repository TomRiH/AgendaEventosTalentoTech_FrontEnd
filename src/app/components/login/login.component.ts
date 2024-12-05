import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private swal: SwalService
  ) {}

  onLogin1(form: any): void {
    if (form.valid) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.authService.setToken(response.token); // Guardar el token en el localStorage
          this.swal.success('Bienvenido', 'Inicio de sesión exitoso');
          this.router.navigate(['/']); // Redirigir al dashboard o página principal
        },
        error: (err) => {
          this.swal.error('Error', 'Credenciales incorrectas');
          console.error(err);
        },
      });
    } else {
      this.swal.error('Error', 'Debe completar todos los campos correctamente');
    }
  }

  onLogin(form: any): void {
    if (form.valid) {
      this.authService.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"); // Guardar el token en el localStorage

      this.swal.success('Bienvenido', 'Inicio de sesión exitoso');
      this.router.navigate(['/usuarios']);
    } else {
      this.swal.error('Error', 'Debe completar todos los campos correctamente');
    }
  }

}

