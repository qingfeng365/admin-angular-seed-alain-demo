import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { QueryListComponent } from './query-list/query-list.component';
import { ListRoutingModule } from './list-routing.module';



const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ListRoutingModule,
  ],
  declarations: [
    QueryListComponent,
    ...COMPONENT_NOROUNT,
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ListModule { }
