import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BasicCurdRoutingModule } from './basic-curd-routing.module';
import { BasicCurdListComponent } from './basic-curd-list/basic-curd-list.component';
import { BasicCurdViewModalComponent } from './basic-curd-view-modal/basic-curd-view-modal.component';
import { BasicCurdEditModalComponent } from './basic-curd-edit-modal/basic-curd-edit-modal.component';


const COMPONENTS = [
  BasicCurdListComponent,
];
const COMPONENTS_NOROUNT = [
  BasicCurdEditModalComponent,
  BasicCurdViewModalComponent
];

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
