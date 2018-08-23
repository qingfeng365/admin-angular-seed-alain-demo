import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityAuthComponent } from './security-auth/security-auth.component';
import { SecurityRightComponent } from './security-right/security-right.component';

const routes: Routes = [
  {
    path: 'test_auth',
    component: SecurityAuthComponent,
  },
  {
    path: 'test_right',
    component: SecurityRightComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
