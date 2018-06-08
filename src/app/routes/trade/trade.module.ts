import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TradeRoutingModule } from './trade-routing.module';
import { TradeListComponent } from './list/list.component';
import { TradeCurdComponent } from './curd/curd.component';
import { TradeEditComponent } from './curd/edit/edit.component';
import { TradeViewComponent } from './curd/view/view.component';

const COMPONENTS = [
  TradeListComponent,
  TradeCurdComponent];
const COMPONENTS_NOROUNT = [
  TradeEditComponent,
  TradeViewComponent];

@NgModule({
  imports: [
    SharedModule,
    TradeRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TradeModule { }
