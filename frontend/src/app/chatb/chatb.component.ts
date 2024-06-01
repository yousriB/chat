import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-chatb',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './chatb.component.html',
  styleUrl: './chatb.component.css'
})
export class ChatbComponent implements OnInit {

  form: any = {
    // username: null,
    password: null,
    username: null,
    prenom: null,
    email: null,
    numero: null,
    passwordtest:null,

    message:null,
     input_language:null,
      output_language:null
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

  idpatient: any;
  questionlast:any

  messagesbyidpatientMedecin: any[] = [];
  messagesbyidpatientDoctor: any[] = [];
  selectedMedecinName: any;
  rep: any;

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private tokenStorage: TokenStorageService, private router: Router) { }

    ngOnInit(): void {
      if (this.tokenStorage.getToken()) {
        this.rolePatient = this.tokenStorage.getUser().user.type_c === 'Medecin';
        this.user = this.tokenStorage.getUser().user;
        // console.log(this.user)
        this.authService.getquestion_by_id_medecin(this.user.id).subscribe(
          (res) => {
            this.messagesbyidpatient = res;
            console.log(this.messagesbyidpatient)
        
            // Check if there are messages
            if (this.messagesbyidpatient && this.messagesbyidpatient.length > 0) {
              const uniqueDoctorIds = new Set(); // To keep track of encountered doctor IDs
              const filteredMessages = [];
        
              for (const message of this.messagesbyidpatient) {
                if (!uniqueDoctorIds.has(message.medecin.id)) {
                  uniqueDoctorIds.add(message.medecin.id);
                  filteredMessages.push(message);
                }
              }
        
              // Assign the filtered messages to the original variable
              this.messagesbyidpatient = filteredMessages;
              console.log(this.messagesbyidpatient 

              )
            }
          },
          (err) => {
            console.log(err);
          }
        );
        if (this.tokenStorage.getUser() && this.rolePatient) {
          // this.router.navigate(['medecin/chat']);
          this.router.navigate(['']);
        }
      }
    }
    add_message(): void {
      const formData = new FormData();
      formData.append('message', this.form.message);
      formData.append('input_language', this.form.input_language);
      formData.append('output_language', this.form.output_language);
  
      this.authService.postchat(formData).subscribe(data => {
        console.log(data);
        this.rep=data;
        console.log(this.rep)
      });
    }




    logout(): void {
      this.tokenStorage.signOut();
      this.router.navigate(['auth/medecin/login']);
    }
    messagesMedecin(id: any,username: string) {
      this.selectedMedecinName = username; 
      this.idpatient = id;
      this.router.navigate([`/chat/${id}`]);
    
      // Get messages by patient and doctor
      this.authService.getmessagebyidpatientandmedecin(id, this.user.id).subscribe(
        (messageRes) => {
          this.messagesbyidpatientMedecin = messageRes;
          console.log("Messages:", messageRes);
    
          // For each question, get responses
          this.messagesbyidpatientMedecin.forEach((question: { id: any; responses: any[]; }) => {
            this.authService.getresponse_by_id_question(question.id).subscribe(
              (responseRes) => {
                question.responses = responseRes;
                console.log("Responses for question", question.id, ":", responseRes);
              },
              (err) => {
                console.log(err);
              }
            );
          });
    
          // Set the ID of the last question
          const lastQuestion = this.messagesbyidpatientMedecin[this.messagesbyidpatientMedecin.length - 1];
          this.questionlast = lastQuestion ? lastQuestion : { id: null }; // If there are no questions, set ID to null
        },
        (err) => {
          console.log(err);
        }
      );
    
      // Get responses by patient and doctor
      this.authService.getresponsebyidpatientandmedecin(id, this.user.id).subscribe(
        (responseRes) => {
          console.log("Responses:", responseRes);
          this.messagesbyidpatientDoctor = responseRes;
        },
        (err) => {
          console.log(err);
        }
      );
    }
    
   
    

}

