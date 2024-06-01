import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  form: any = {
    // username: null,
    password: null,
    username: null,
    prenom: null,
    email: null,
    numero: null,
    passwordtest:null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  prenom?: string;
  email: any;
  roleAdmin = false;
  roleEmployee = false;
  isSuccessful = false;
  isSignUpFailed = false;
  userArray: any[] = [];

  userexists = false;
  emailxists = false;

  erreurMsg: any;
  erreurMsgemail: any;

  codesms: any;
  first_name: any;
  username: any;
  email_user: any;
  token: any;
  samepasswoed: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getToken());

      if (this.tokenStorage.getUser()) {
        this.router.navigate(['/user/profil']);
      }
    } else {
      this.router.navigate(['auth/patient/registre']);
    }

    const characters = '012a3C4H5k6789';
    let token = '';

    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
      this.token = token;
    }
  }

  onSubmit(): void {
   
    const { email, specialite, lang, password } = this.form;

    this.authService.getAlluesrListuser().subscribe((data) => {
      this.userArray = data;
      console.log(this.userArray);

      // const existsInBd = this.userArray.some(element => element.username === username);
      const existsInBdphone = this.userArray.some(
        (element) => element.email === this.form.email
      );

      // console.log(existsInBd)
      console.log(existsInBdphone);

      // console.log(username)
      console.log('input est : ');
      console.log(email);

      if (existsInBdphone) {
        this.emailxists = true;
        this.erreurMsgemail = 'This email is already in use!';
        // console.log(this.erreurMsg);
      }

      if (this.form.password == this.form.passwordtest) {
    
      
      if (!existsInBdphone) {
        const characters = '012a3C4H5k6789';
         
         
        const user = {
          password: this.form.password,
          username: this.form.username,
          first_name: '',
          email: this.form.email,
          is_active: true,
        };

        this.authService.register_patient(user, email, lang).subscribe(
          (data) => {
            console.log(data);
            // console.log(data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
            Swal.fire({
              title: "Register",
              text: "Register succesfully",
              icon: "success"
            });
            this.router.navigate(['/auth/patient/login']);
          },

          (err) => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;

            // console.error(this.errorMessage);
          }
        );
      }
    }
    else{
      console.log('password incorrect')
      this.samepasswoed = false
    }
    });
  }

  reloadPage(): void {
    window.location.reload();
    this.router.navigate(['patient/chat']);
  }
}
