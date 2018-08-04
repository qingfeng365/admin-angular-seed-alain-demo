import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SettingsService, TitleService, _HttpClient } from '@delon/theme';
import { filter } from 'rxjs/operators';
import { ReuseTabService } from '@delon/abc';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  @HostBinding('class.layout-fixed')
  get isFixed() {
    return this.settings.layout.fixed;
  }
  @HostBinding('class.layout-boxed')
  get isBoxed() {
    return this.settings.layout.boxed;
  }
  @HostBinding('class.aside-collapsed')
  get isCollapsed() {
    return this.settings.layout.collapsed;
  }

  constructor(
    private settings: SettingsService,
    private router: Router,
    private titleSrv: TitleService,
    private reuseTabService: ReuseTabService,
    private http: _HttpClient,
  ) {
    this.reuseTabService.debug = true;
  }

  ngOnInit() {
    // 强制先打开主页, 即不允许直接输入 下级路由的 url ,打开程序,
    // 只能先打开主页, 通过菜单访问 下级页面
    // 并设置 主页不可关闭, 这样保证总有一个页面存在
    this.router.navigateByUrl('/home');
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => this.titleSrv.setTitle());

    const url = 'http://127.0.0.1:7001/security';


  }
}
