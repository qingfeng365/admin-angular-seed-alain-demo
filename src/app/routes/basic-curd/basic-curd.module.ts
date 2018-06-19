import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BasicCurdRoutingModule } from './basic-curd-routing.module';
import { BasicCurdListComponent } from './basic-curd-list/basic-curd-list.component';


const COMPONENTS = [
  BasicCurdListComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    BasicCurdRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class BasicCurdModule { }
