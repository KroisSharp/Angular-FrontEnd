import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {path: 'mainmenu', component: MainMenuComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'Create', component: CreateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[MainMenuComponent, SignInComponent, CreateUserComponent,]