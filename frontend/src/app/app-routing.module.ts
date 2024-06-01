import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AdminhomeComponent } from './components/pages/adminhome/adminhome.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ChatpatientComponent } from './components/pages/chatpatient/chatpatient.component';
import { ChatmedecinComponent } from './components/pages/chatmedecin/chatmedecin.component';
import { RegistermedecinComponent } from './components/pages/registermedecin/registermedecin.component';
import { LoginmedecinComponent } from './components/pages/loginmedecin/loginmedecin.component';

const routes: Routes = [
  { path: '', redirectTo: 'medecin/chat', pathMatch: 'full' },
  { path: 'adminhome', component: AdminhomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'auth/patient/login', component: LoginComponent },
  { path: 'auth/medecin/login', component: LoginmedecinComponent },
  { path: 'patient/registre', component: RegisterComponent },
  { path: 'medecin/register', component:RegistermedecinComponent  },
  { path: 'patient/chat', component: ChatpatientComponent },
  { path: 'patient/chat/:id', component: ChatpatientComponent },
  { path: 'medecin/chat/:id', component: ChatmedecinComponent },
  { path: 'medecin/chat', component: ChatmedecinComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
