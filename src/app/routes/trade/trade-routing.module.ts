import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradeListComponent } from './list/list.component';
import { TradeCurdComponent } from './curd/curd.component';

const routes: Routes = [

  { path: 'list', component: TradeListComponent },
  { path: 'curd', component: TradeCurdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRoutingModule { }
