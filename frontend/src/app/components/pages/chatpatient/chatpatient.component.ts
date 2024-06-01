import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service';
import { TranslationService } from 'src/app/services/translation.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-chatpatient',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './chatpatient.component.html',
  styleUrls: ['./chatpatient.component.css']
})
export class ChatpatientComponent implements OnInit {
  form: any = {
    question_text: null
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
  title = 'translate-app';
  translatedText: string = '';
  translate: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.rolePatient = this.tokenStorage.getUser().user.type_c === 'Patient';
      this.user = this.tokenStorage.getUser().user;

      this.authService.getmessagebyidpatient(this.user.id).subscribe(
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
    formData.append('question_text', this.form.question_text);

    this.authService.add_message_patient(formData).subscribe(data => {
      console.log(data);
      this.messagesMedecin(this.idmedecin, this.selectedMedecinName);
    });
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['auth/patient/login']);
  }

  messagesMedecin(id: any, username: string) {
    this.selectedMedecinName = username;
    this.idmedecin = id;
    this.router.navigate([`/patient/chat/${id}`]);

    this.authService.getmessagebyidpatientandmedecin(this.user.id, id).subscribe(
      (res: any[]) => {
        this.messagesbyidpatientMedecin = res;
        this.messagesbyidpatientMedecin.forEach((question: { question_text: any; id: any; responses: any[]; }) => {
          this.authService.getresponse_by_id_question(question.id).subscribe(
            (data) => {
              question.responses = data;
            },
            (err) => {
              console.log(err);
            }
          );
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
