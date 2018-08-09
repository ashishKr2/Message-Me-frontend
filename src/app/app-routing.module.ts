
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {SignupComponent} from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { MessageComponent } from './components/message/message.component';


const routes: Routes=[
    {path: '', redirectTo:'/home', pathMatch: 'full'},  
    {path: 'home', component: HomeComponent},
 {path: 'signup', component:SignupComponent},
    {path: 'login', component:LoginComponent},
    {path: 'message', component:MessageComponent},
    {path: 'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
    
    ];
    @NgModule({
      imports: [
         CommonModule,
         RouterModule.forRoot(routes)
      ],
      exports: [RouterModule],
      declarations: []
    })
    export class AppRoutingModule { }
    
    export const routingComponents = [HomeComponent,MessageComponent, SignupComponent ,DashboardComponent, LoginComponent];
    
    
