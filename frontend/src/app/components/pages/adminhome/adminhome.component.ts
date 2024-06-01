import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service';


@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule, // Include CommonModule
  ],
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {




  form: any = {
    response_text: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  prenom?: string;
  email: any;
  roleDoctor = false;
  user: any;
  patients: any[] = [];
  messagesbyiddoctor: any;
  messagesbyidpatientDoctor: any;
  idpatient: any;
  selectedPatientName: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roleDoctor = this.tokenStorage.getUser().user.type_c === 'Doctor';
      this.user = this.tokenStorage.getUser().user;

      this.authService.getquestion_by_id_medecin(this.user.id).subscribe(
        (res) => {
          this.messagesbyiddoctor = res;

          if (this.messagesbyiddoctor && this.messagesbyiddoctor.length > 0) {
            const uniquePatientIds = new Set();
            const filteredMessages = [];

            for (const message of this.messagesbyiddoctor) {
              if (!uniquePatientIds.has(message.patient.id)) {
                uniquePatientIds.add(message.patient.id);
                filteredMessages.push(message);
              }
            }

            this.messagesbyiddoctor = filteredMessages;
          }
        },
        (err) => {
          console.log(err);
        }
      );

      if (this.tokenStorage.getUser() && this.roleDoctor) {
        this.router.navigate(['doctor/chat']);
      }
    }
  }

  add_response(): void {
    const formData = new FormData();
    formData.append('medecin', this.user.id);
    formData.append('patient', this.idpatient);
    formData.append('response_text', this.form.response_text);

    this.authService.add_response_medecin(formData).subscribe(data => {
      console.log(data);
      this.messagesPatient(this.idpatient, this.selectedPatientName);
    });
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['auth/doctor/login']);
  }

  messagesPatient(id: any, username: string) {
    this.selectedPatientName = username;
    this.idpatient = id;
    this.router.navigate([`/doctor/chat/${id}`]);

    this.authService.getmessagebyidpatientandmedecin(id, this.user.id).subscribe(
      (res: any[]) => {
        this.messagesbyidpatientDoctor = res;
        this.messagesbyidpatientDoctor.forEach((question: { question_text: any; id: any; responses: any[]; }) => {
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
