

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';

 
 
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer ${accessToken}'
// }) 

// };
// const httppp = {
//   headers: new HttpHeaders({
   
//     'Authorization': 'Bearer ${accessToken}'   })

// };

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private http: HttpClient) { }
//   login_patient(email: string, password: string): Observable<any> {
//     return this.http.post(environment.api +'/auth/patient/login/', {
//     email,
//     password
//   }, httpOptions);
//   }
//   login_medecin(email: string, password: string): Observable<any> {
//     return this.http.post(environment.api +'/auth/medecin/login/', {
//     email,
//     password
//   }, httpOptions);
//   }
//   register_medecin(user: any, email: any,specialite:any,lang:any): Observable<any> {
//     return this.http.post(environment.api +'/auth/medecin/regist/', {
//       user,
//       email,
//       specialite,
//       lang,
//     }, httpOptions);
//   }
//   getMedecinList(): Observable<any[]> {
//     return this.http.get(environment.api+'/auth/medecin/regist/') as Observable<any[]>;
//     }

// getmessagebyidpatient(id:any): Observable<any[]> {
//   return this.http.get(environment.api+`/question/${id}/patient/`) as Observable<any[]>;
//     }
// getmessagebyidpatientandmedecin(id:any, idm:any): Observable<any[]> {
//   return this.http.get(environment.api+`/question/${id}/patient/${idm}/`) as Observable<any[]>;
//     }
// getresponsebyidpatientandmedecin(id:any, idm:any): Observable<any[]> {
//   return this.http.get(environment.api+`/reponse/${id}/patient/${idm}/`) as Observable<any[]>;
//     }

// getresponseby_id_medecin(id:any): Observable<any[]> {
//   return this.http.get(environment.api+`/reponse/${id}/medecin/`) as Observable<any[]>;
//     }
// getquestion_by_id_medecin(id:any): Observable<any[]> {
//   return this.http.get(environment.api+`/question/${id}/medecin/`) as Observable<any[]>;
//     }

// getresponse_by_id_question(id:any): Observable<any[]> {
//   return this.http.get(environment.api+`/reponse/${id}/question/`) as Observable<any[]>;
//     }


//   register_patient(user: any, email: any,lang:any): Observable<any> {
//     return this.http.post(environment.api +'/auth/patient/regist/', {
//       user,
//       email,
//       lang,
//     }, httpOptions);
//   }
// // -------------------emails send  api------------------ 
//   sendSMsResetPassword(emailData: any): Observable<any> {
//     return this.http.post(environment.api + '/Envoyer_Code_by_email/', emailData);
//   }
//   UpdateCode(vpt: any,first_name: string): Observable<any> {
//     return this.http.put(environment.api + '/editcode/' + vpt+"/", {
//       first_name,
//     }, httpOptions);
//   }
//   getAlluesrList(): Observable<[]> {
//     return this.http.get(environment.api + '/etablis/regist/') as Observable<[]>;
//   }
//   getAlluesrListuser(): Observable<[]> {
//     return this.http.get(environment.api + '/user/all/') as Observable<[]>;
//   }



//   add_message_patient(formData:any): Observable<Object> {
//     return this.http.post(environment.api + '/question/add/',formData);
//   }


//   add_response_medecin(formData:any): Observable<Object> {
//     return this.http.post(environment.api + '/reponse/add/',formData);
//   }








// }






import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login_patient(email: string, password: string): Observable<any> {
    return this.http.post(environment.api + '/auth/patient/login/', { email, password }, httpOptions);
  }

  login_medecin(email: string, password: string): Observable<any> {
    return this.http.post(environment.api + '/auth/medecin/login/', { email, password }, httpOptions);
  }

  register_medecin(user: any, email: any, specialite: any, lang: any): Observable<any> {
    return this.http.post(environment.api + '/auth/medecin/regist/', { user, email, specialite, lang }, httpOptions);
  }

  getMedecinList(): Observable<any[]> {
    return this.http.get(environment.api + '/auth/medecin/regist/') as Observable<any[]>;
  }

  getmessagebyidpatient(id: any): Observable<any[]> {
    return this.http.get(environment.api + `/question/${id}/patient/`) as Observable<any[]>;
  }

  getmessagebyidpatientandmedecin(id: any, idm: any): Observable<any[]> {
    return this.http.get(environment.api + `/question/${id}/patient/${idm}/`) as Observable<any[]>;
  }

  getresponsebyidpatientandmedecin(id: any, idm: any): Observable<any[]> {
    return this.http.get(environment.api + `/reponse/${id}/patient/${idm}/`) as Observable<any[]>;
  }

  getresponseby_id_medecin(id: any): Observable<any[]> {
    return this.http.get(environment.api + `/reponse/${id}/medecin/`) as Observable<any[]>;
  }

  getquestion_by_id_medecin(id: any): Observable<any[]> {
    return this.http.get(environment.api + `/question/${id}/medecin/`) as Observable<any[]>;
  }

  getresponse_by_id_question(id: any): Observable<any[]> {
    return this.http.get(environment.api + `/reponse/${id}/question/`) as Observable<any[]>;
  }

  register_patient(user: any, email: any, lang: any): Observable<any> {
    return this.http.post(environment.api + '/auth/patient/regist/', { user, email, lang }, httpOptions);
  }

  sendSMsResetPassword(emailData: any): Observable<any> {
    return this.http.post(environment.api + '/Envoyer_Code_by_email/', emailData);
  }

  UpdateCode(vpt: any, first_name: string): Observable<any> {
    return this.http.put(environment.api + '/editcode/' + vpt + "/", { first_name }, httpOptions);
  }

  getAlluesrList(): Observable<any[]> {
    return this.http.get(environment.api + '/etablis/regist/') as Observable<any[]>;
  }

  getAlluesrListuser(): Observable<any[]> {
    return this.http.get(environment.api + '/user/all/') as Observable<any[]>;
  }

  add_message_patient(formData: any): Observable<Object> {
    return this.http.post(environment.api + '/question/add/', formData);
  }

  add_response_medecin(formData: any): Observable<Object> {
    return this.http.post(environment.api + '/reponse/add/', formData);
  }


  /************************** */





  getchatroombyidpatient(id: any): Observable<any[]> {
    return this.http.get(environment.api + `/chatroom/${id}/patient/`) as Observable<any[]>;
  }
  getchatroombyidmedecin(id: any): Observable<any[]> {
    return this.http.get(environment.api + `/chatroom/${id}/medecin/`) as Observable<any[]>;
  }

  getchatroombyidpatientandmedecin(id: any, idm: any): Observable<any[]> {
    return this.http.get(environment.api + `/chatroom/${id}/patient/${idm}/`) as Observable<any[]>;
  }

  add_chatroom_medecin(formData: any): Observable<Object> {
    return this.http.post(environment.api + '/chatroom/add/', formData);
  }
}
