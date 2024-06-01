import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-chatmedecin',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './chatmedecin.component.html',
  styleUrl: './chatmedecin.component.css'
})
export class ChatmedecinComponent implements OnInit {

  form: any = {
    reponse_text:null
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
                // Check if we have already encountered a message from this doctor
                if (!uniqueDoctorIds.has(message.medecin.id)) {
                  // Add this doctor's ID to the set to mark it as encountered
                  uniqueDoctorIds.add(message.medecin.id);
                  // Add this message to the filtered list
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
          this.router.navigate(['medecin/chat']);
        }
      }
    }
    add_message():void{
      const formData= new FormData();
      formData.append('patient',this.idpatient)
      formData.append('medecin',this.user.id)
      formData.append('reponse_text',this.form.reponse_text)
      formData.append('question',this.questionlast.id)
      
      this.authService.add_response_medecin(formData).subscribe(data=>{
        console.log(data)
       
        this.messagesMedecin(this.idpatient)
      })
    }
    logout(): void {
      this.tokenStorage.signOut();
      this.router.navigate(['auth/medecin/login']);
    }
    messagesMedecin(id: any) {
      this.idpatient = id;
      this.router.navigate([`/medecin/chat/${id}`]);
    
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
