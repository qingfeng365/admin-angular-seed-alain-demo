/**
 * 进一步对基础模块的导入提炼
 * 有关模块注册指导原则请参考：https://github.com/ng-alain/ng-alain/issues/180
 */
import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from '@angular/core';
import { throwIfAlreadyLoaded } from '@core/module-import-guard';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonChartModule } from '@delon/chart';
import { DelonAuthModule, DA_STORE_TOKEN, MemoryStore } from '@delon/auth';
import { DelonACLModule } from '@delon/acl';
import { DelonCacheModule } from '@delon/cache';
import { DelonUtilModule } from '@delon/util';

// #region mock
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../../_mock';
import { environment } from '@env/environment';
const MOCK_MODULES = !environment.production
  ? [DelonMockModule.forRoot({ data: MOCKDATA })]
  : [];
// #endregion

// #region reuse-tab
/**
 * 若需要[路由复用](https://ng-alain.com/components/reuse-tab)需要：
 * 1、增加 `REUSETAB_PROVIDES`
 * 2、在 `src/app/layout/default/default.component.html` 修改：
 *  ```html
 *  <section class="alain-default__content">
 *    <reuse-tab></reuse-tab>
 *    <router-outlet></router-outlet>
 *  </section>
 *  ```
 */
import { RouteReuseStrategy } from '@angular/router';
import { ReuseTabService, ReuseTabStrategy } from '@delon/abc/reuse-tab';
const REUSETAB_PROVIDES = [
  // {
  //   provide: RouteReuseStrategy,
  //   useClass: ReuseTabStrategy,
  //   deps: [ReuseTabService],
  // },
];
// #endregion

// #region global config functions

import { PageHeaderConfig } from '@delon/abc';
export function fnPageHeaderConfig(): PageHeaderConfig {
  return Object.assign(new PageHeaderConfig(), { homeI18n: 'home' });
}

import { DelonAuthConfig } from '@delon/auth';
export function fnDelonAuthConfig(): DelonAuthConfig {
  return Object.assign(new DelonAuthConfig(), <DelonAuthConfig>{
    login_url: '/passport/login',
  });
}

const GLOBAL_CONFIG_PROVIDES = [
  // TIPS：@delon/abc 有大量的全局配置信息，例如设置所有 `st` 的页码默认为 `20` 行
  // { provide: STConfig, useFactory: fnSTConfig }
  { provide: PageHeaderConfig, useFactory: fnPageHeaderConfig },
  { provide: DelonAuthConfig, useFactory: fnDelonAuthConfig },
];

// #endregion

@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    AlainThemeModule.forRoot(),
    DelonABCModule.forRoot(),
    DelonChartModule.forRoot(),
    DelonAuthModule.forRoot(),
    DelonACLModule.forRoot(),
    DelonCacheModule.forRoot(),
    DelonUtilModule.forRoot(),
    // mock
    ...MOCK_MODULES,
  ],
})
export class DelonModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: DelonModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'DelonModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonModule,
      providers: [
        ...REUSETAB_PROVIDES,
        ...GLOBAL_CONFIG_PROVIDES,
        // 认证 TOKEN,  用 sessionStorage 存储，关掉浏览器后丢失
        { provide: DA_STORE_TOKEN, useClass: MemoryStore }],
    };
  }
}



// /**
//  * 进一步对基础模块的导入提炼
//  * 有关模块注册指导原则请参考：https://github.com/cipchk/ng-alain/issues/180
//  */
// import {
//   NgModule,
//   Optional,
//   SkipSelf,
//   ModuleWithProviders,
// } from '@angular/core';
// import { RouteReuseStrategy } from '@angular/router';
// import { throwIfAlreadyLoaded } from '@core/module-import-guard';

// import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { AlainThemeModule } from '@delon/theme';
// import { DelonABCModule, ReuseTabService, ReuseTabStrategy } from '@delon/abc';
// import { DelonChartModule } from '@delon/chart';

// import { DelonAuthModule, DA_STORE_TOKEN, MemoryStore } from '@delon/auth';
// import { DelonACLModule } from '@delon/acl';
// import { DelonCacheModule } from '@delon/cache';
// import { DelonUtilModule } from '@delon/util';
// // mock
// import { DelonMockModule } from '@delon/mock';
// import * as MOCKDATA from '../../_mock';
// import { environment } from '@env/environment';
// const MOCKMODULE = !environment.production ? [DelonMockModule.forRoot({ data: MOCKDATA })] : [];

// // region: global config functions

// import { PageHeaderConfig } from '@delon/abc';
// export function fnPageHeaderConfig(): PageHeaderConfig {
//   return Object.assign(new PageHeaderConfig(), { homeI18n: 'home' });
// }

// import { STConfig } from '@delon/abc';
// export function fnSTConfig(): STConfig {
//   return Object.assign(new STConfig(), {});
// }

// import { DelonAuthConfig } from '@delon/auth';
// export function fnDelonAuthConfig(): DelonAuthConfig {
//   return Object.assign(new DelonAuthConfig(), <DelonAuthConfig>{
//     login_url: '/passport/login',
//   });
// }

// // endregion

// @NgModule({
//   imports: [
//     NgZorroAntdModule.forRoot(),
//     AlainThemeModule.forRoot(),
//     DelonABCModule.forRoot(),
//     DelonChartModule.forRoot(),
//     DelonAuthModule.forRoot(),
//     DelonACLModule.forRoot(),
//     DelonCacheModule.forRoot(),
//     DelonUtilModule.forRoot(),
//     // mock
//     ...MOCKMODULE,
//   ],
// })
// export class DelonModule {
//   constructor(
//     @Optional()
//     @SkipSelf()
//     parentModule: DelonModule,
//   ) {
//     throwIfAlreadyLoaded(parentModule, 'DelonModule');
//   }

//   static forRoot(): ModuleWithProviders {
//     return {
//       ngModule: DelonModule,
//       providers: [
//         // TIPS：若不需要路由复用需要移除以下代码及模板`<reuse-tab></reuse-tab>`
//         {
//           provide: RouteReuseStrategy,
//           useClass: ReuseTabStrategy,
//           deps: [ReuseTabService],
//         },
//         // TIPS：@delon/abc 有大量的全局配置信息，例如设置所有 `st` 的页码默认为 `20` 行
//         { provide: STConfig, useFactory: fnSTConfig },
//         { provide: PageHeaderConfig, useFactory: fnPageHeaderConfig },
//         { provide: DelonAuthConfig, useFactory: fnDelonAuthConfig },
//         // 认证 TOKEN,  用 sessionStorage 存储，关掉浏览器后丢失
//         { provide: DA_STORE_TOKEN, useClass: MemoryStore }
//       ],
//     };
//   }
// }
