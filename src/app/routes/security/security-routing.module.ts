import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityCsrfComponent } from './security-csrf/security-csrf.component';

const routes: Routes = [
  {
    path: 'csrf',
    component: SecurityCsrfComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
