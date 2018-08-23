import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityAuthComponent } from './security-auth/security-auth.component';
import { SecurityRightComponent } from './security-right/security-right.component';

const COMPONENTS = [SecurityAuthComponent, SecurityRightComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    SecurityRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SecurityModule { }
