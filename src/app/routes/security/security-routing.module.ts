import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityAuthComponent } from './security-auth/security-auth.component';

const routes: Routes = [
  {
    path: 'test_auth',
    component: SecurityAuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
