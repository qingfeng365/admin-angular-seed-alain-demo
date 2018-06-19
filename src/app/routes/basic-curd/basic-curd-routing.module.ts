import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicCurdListComponent } from './basic-curd-list/basic-curd-list.component';

const routes: Routes = [

  { path: 'list', component: BasicCurdListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicCurdRoutingModule { }
