import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { ProRoutingModule } from './pro-routing.module';


import { ProAccountCenterComponent } from './account/center/center.component';
import { ProAccountCenterArticlesComponent } from './account/center/articles/articles.component';
import { ProAccountCenterApplicationsComponent } from './account/center/applications/applications.component';
import { ProAccountCenterProjectsComponent } from './account/center/projects/projects.component';
import { ProAccountSettingsComponent } from './account/settings/settings.component';
import { ProAccountSettingsBaseComponent } from './account/settings/base/base.component';
import { ProAccountSettingsSecurityComponent } from './account/settings/security/security.component';
import { ProAccountSettingsBindingComponent } from './account/settings/binding/binding.component';
import { ProAccountSettingsNotificationComponent } from './account/settings/notification/notification.component';

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, ProRoutingModule],
  declarations: [
    ProAccountCenterComponent,
    ProAccountCenterArticlesComponent,
    ProAccountCenterProjectsComponent,
    ProAccountCenterApplicationsComponent,
    ProAccountSettingsComponent,
    ProAccountSettingsBaseComponent,
    ProAccountSettingsSecurityComponent,
    ProAccountSettingsBindingComponent,
    ProAccountSettingsNotificationComponent,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ProModule { }
