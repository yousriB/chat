import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-loginmedecin',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './loginmedecin.component.html',
  styleUrl: './loginmedecin.component.css'
})
export class LoginmedecinComponent implements OnInit {

  form: any = {
    email: null,
    password: null,
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  prenom?: string;
  email: any;
  rolePatient = false;
 
  constructor(private route: ActivatedRoute, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getToken())
      this.rolePatient = this.tokenStorage.getUser().user.type_c === 'Patient';
      if (this.tokenStorage.getUser() && this.rolePatient) {
        this.router.navigate(['medecin/chat']); 
      }
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login_medecin(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['medecin/chat']);
       
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
