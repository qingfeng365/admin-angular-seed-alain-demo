import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'security-csrf',
  templateUrl: './security-csrf.component.html',
  styleUrls: ['./security-csrf.component.less']
})
export class SecurityCsrfComponent implements OnInit {

  constructor(private http: _HttpClient,
    public msg: NzMessageService,
    private modalHelper: ModalHelper) { }

  ngOnInit() {
  }
  post() {
    const url = 'http://127.0.0.1:7001/security/csrf/post';

    const body = {
      data: 1
    };


    this.http
      .post(url, body, {}, {
        // withCredentials: true,
      })
      .subscribe(
        res => {
          console.log('post result: ', res);
        },
        error => {
          console.log('post error: ', error);
        });


  }
}
