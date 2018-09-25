import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProAccountCenterComponent } from './account/center/center.component';
import { ProAccountCenterArticlesComponent } from './account/center/articles/articles.component';
import { ProAccountCenterApplicationsComponent } from './account/center/applications/applications.component';
import { ProAccountCenterProjectsComponent } from './account/center/projects/projects.component';
import { ProAccountSettingsComponent } from './account/settings/settings.component';
import { ProAccountSettingsBaseComponent } from './account/settings/base/base.component';
import { ProAccountSettingsSecurityComponent } from './account/settings/security/security.component';
import { ProAccountSettingsBindingComponent } from './account/settings/binding/binding.component';
import { ProAccountSettingsNotificationComponent } from './account/settings/notification/notification.component';

const routes: Routes = [
  {
    path: 'account',
    children: [
      {
        path: 'center',
        component: ProAccountCenterComponent,
        children: [
          { path: '', redirectTo: 'articles', pathMatch: 'full' },
          {
            path: 'articles',
            component: ProAccountCenterArticlesComponent,
            data: { titleI18n: 'pro-account-center' },
          },
          {
            path: 'projects',
            component: ProAccountCenterProjectsComponent,
            data: { titleI18n: 'pro-account-center' },
          },
          {
            path: 'applications',
            component: ProAccountCenterApplicationsComponent,
            data: { titleI18n: 'pro-account-center' },
          },
        ],
      },
      {
        path: 'settings',
        component: ProAccountSettingsComponent,
        children: [
          { path: '', redirectTo: 'base', pathMatch: 'full' },
          {
            path: 'base',
            component: ProAccountSettingsBaseComponent,
            data: { titleI18n: 'pro-account-settings' },
          },
          {
            path: 'security',
            component: ProAccountSettingsSecurityComponent,
            data: { titleI18n: 'pro-account-settings' },
          },
          {
            path: 'binding',
            component: ProAccountSettingsBindingComponent,
            data: { titleI18n: 'pro-account-settings' },
          },
          {
            path: 'notification',
            component: ProAccountSettingsNotificationComponent,
            data: { titleI18n: 'pro-account-settings' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProRoutingModule { }
