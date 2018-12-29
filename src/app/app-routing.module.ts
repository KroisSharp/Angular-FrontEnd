import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path: 'mainmenu', component: MainMenuComponent},
  {path: 'signin', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[MainMenuComponent, SignInComponent]