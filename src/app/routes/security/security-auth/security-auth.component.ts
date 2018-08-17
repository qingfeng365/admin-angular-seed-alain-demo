import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ApiService } from '@core/api/api.service';

@Component({
  selector: 'security-auth',
  templateUrl: './security-auth.component.html',
  styleUrls: ['./security-auth.component.less']
})

export class SecurityAuthComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalHelper: ModalHelper,
    private apiService: ApiService,

    private modalSrv: NzModalService,
  ) {

  }
  ngOnInit() {
  }
  runAuthUseGet() {
    let apiUrl = 'auth/work_need_check_token';
    apiUrl = this.apiService.getFullUrl(apiUrl);

    /**
     * 如果不需要自动拦截, 增加参数 _allow_anonymous, 值任意均可
     * 如:
     * .get(apiUrl, { _allow_anonymous: true })
     *
     */

    this.http
      .get(apiUrl)
      .subscribe(
        (res: any) => {
          console.log('后端成功返回:', res);
        },
        (err) => {
          console.error('后端服务器返回错误:', err);
          this.modalSrv.error({
            nzTitle: '错误信息',
            nzContent: err.message,
          });
        }
      );
  }

  runAuthUsePost() {
    let apiUrl = 'auth/work_need_check_token';
    apiUrl = this.apiService.getFullUrl(apiUrl);

    this.http
      .post(apiUrl, { data: 'post data' })
      .subscribe(
        (res: any) => {
          console.log('后端成功返回:', res);
        },
        (err) => {
          console.error('返回错误:', err);
          this.modalSrv.error({
            nzTitle: '错误信息',
            nzContent: err.message,
          });
        }
      );
  }
}
