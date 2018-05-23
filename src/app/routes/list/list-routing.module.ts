import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryListComponent } from './query-list/query-list.component';

const routes: Routes = [
  {
    path: 'query-list',
    component: QueryListComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule { }
