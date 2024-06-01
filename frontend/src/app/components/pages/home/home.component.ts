import { Component, OnInit , HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: any = {
    message: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  prenom?: string;
  email: any;
  rolePatient = false;
  user: any;
  doctors: any[] = [];
  messagesbyidpatient: any;
  messagesbyidpatientMedecin: any;
  idmedecin: any;
  selectedMedecinName: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.rolePatient = this.tokenStorage.getUser().user.type_c === 'Patient';
      this.user = this.tokenStorage.getUser().user;

      this.authService.getchatroombyidpatient(this.user.id).subscribe(
        (res) => {
          this.messagesbyidpatient = res;

          if (this.messagesbyidpatient && this.messagesbyidpatient.length > 0) {
            const uniqueDoctorIds = new Set();
            const filteredMessages = [];

            for (const message of this.messagesbyidpatient) {
              if (!uniqueDoctorIds.has(message.medecin.id)) {
                uniqueDoctorIds.add(message.medecin.id);
                filteredMessages.push(message);
              }
            }

            this.messagesbyidpatient = filteredMessages;
          }
        },
        (err) => {
          console.log(err);
        }
      );

      if (this.tokenStorage.getUser() && this.rolePatient) {
        this.router.navigate(['patient/chat']);
      }
    }
  }

  add_message(): void {
    const formData = new FormData();
    formData.append('patient', this.user.id);
    formData.append('medecin', this.idmedecin);
    formData.append('message', this.form.message);

    this.authService.add_chatroom_medecin(formData).subscribe(data => {
      console.log(data);
      this.getchatroombyidmedecin(this.idmedecin, this.selectedMedecinName);
    });
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['auth/patient/login']);
  }

  getchatroombyidmedecin(id: any, username: string) {
    this.selectedMedecinName = username;
    this.idmedecin = id;
    this.router.navigate([`/home/${id}`]);

    this.authService.getchatroombyidpatientandmedecin(this.user.id, id).subscribe(
      (res) => {
        this.messagesbyidpatientMedecin = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}