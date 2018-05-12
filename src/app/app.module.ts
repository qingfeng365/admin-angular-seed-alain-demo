import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UEditorModule } from 'ngx-ueditor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule, // 暂时用这个

    // thirds
    UEditorModule.forRoot({
      // 指定ueditor.js路径目录
      path: 'assets/ueditor/',
      // 默认全局配置项
      options: {
        themePath: '/assets/ueditor/themes/'
      }
    }),
    // JSON-Schema form
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'zh-Hans' },
    // { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    // { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
    // StartupService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: StartupServiceFactory,
    //   deps: [StartupService],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
