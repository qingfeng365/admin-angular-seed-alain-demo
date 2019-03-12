import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  // TokenService,
  ITokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
// import { StartupService } from '@core/startup/startup.service';
import { StartupService } from '@core';
import { ApiService } from '@core/api/api.service';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;

  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    // @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private apiService: ApiService,
    private http: _HttpClient,

  ) {
    this.form = fb.group({
      userName: [null, [Validators.required]],
      password: [null, Validators.required],
    });
    modalSrv.closeAll();
  }

  // region: fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }

  // endregion



  count = 0;
  interval$: any;

  // private handleError(error: HttpErrorResponse) {
  //   console.log('handleError------');
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }
  submit() {
    this.error = '';
    this.userName.markAsDirty();
    this.userName.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.userName.invalid || this.password.invalid) return;

    // mock http
    // **注：** DEMO中使用 `setTimeout` 来模拟 http
    // 默认配置中对所有HTTP请求都会强制[校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.loading = true;


    /** 这是原示例的模拟代码 */

    // setTimeout(() => {
    //   this.loading = false;
    //   if (this.type === 0) {
    //     if (
    //       this.userName.value !== 'admin' ||
    //       this.password.value !== '888888'
    //     ) {
    //       this.error = `账户或密码错误`;
    //       return;
    //     }
    //   }

    //   // 清空路由复用信息
    //   this.reuseTabService.clear();
    //   // 设置Token信息
    //   this.tokenService.set({
    //     token: '123456789',
    //     name: this.userName.value,
    //     email: `cipchk@qq.com`,
    //     id: 10000,
    //     time: +new Date(),
    //   });
    //   // 重新获取 StartupService 内容，若其包括 User 有关的信息的话
    //   // this.startupSrv.load().then(() => this.router.navigate(['/']));
    //   // 否则直接跳转
    //   this.router.navigate(['/']);
    // }, 1000);

    /** 这是访问后端服务器的代码 */

    let apiUrl = 'auth/login';
    apiUrl = this.apiService.getFullUrl(apiUrl);

    console.log('apiUrl:', apiUrl);

    this.http.post(apiUrl, {
      user: this.userName.value,
      password: this.password.value
    }, {})
      .subscribe(
        (res: any) => {
          console.log('后端成功返回:', res);
          // 登录成功后, 先存储 token , 再跳转到首页
          // 清空路由复用信息
          this.reuseTabService.clear();
          // 设置Token信息
          this.tokenService.set(res);

          // 还要处理 StartupService.load, 以后用户信息要改为从 tokenService 取

          /** 以下是跳转到登录前要进入的url示例 */
          // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
          // this.startupSrv.load().then(() => {
          //   let url = this.tokenService.referrer.url || '/';
          //   if (url.includes('/passport')) url = '/';
          //   this.router.navigateByUrl(url);
          // });

          // 跳转回首页
          this.router.navigate(['/']);
        },
        (err) => {
          console.error('后端服务器返回错误:', err);
          this.modalSrv.error({
            nzTitle: '错误信息',
            nzContent: err.message,
          });
        },
        () => {
        });

  }



  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
