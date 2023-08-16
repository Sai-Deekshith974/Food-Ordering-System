import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillGenerationComponent } from './components/bill-generation/bill-generation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryComponent } from './components/history/history.component';
import {HomeComponent} from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { SignupComponent } from './components/signup/signup.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

const routes: Routes = [
                        {path:'',component:HomeComponent},
                        {path:'login',component:LoginComponent},
                        {path:'signup',component:SignupComponent},
                        {path:'dashboard',component:DashboardComponent},
                        {path:'menu',component:MenuComponent},
                        {path:'bill',component:BillGenerationComponent},
                        {path:'history',component:HistoryComponent},
                        {path:'update_profile',component:UpdateProfileComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
