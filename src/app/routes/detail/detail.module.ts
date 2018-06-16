import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DetailRoutingModule } from './detail-routing.module';
import { BasicComponent } from './basic/basic.component';
import { AdvancedComponent } from './advanced/advanced.component';

const COMPONENTS = [
  BasicComponent,
  AdvancedComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    DetailRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,

  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class DetailModule { }
