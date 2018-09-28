import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { map } from 'rxjs/operators';

@Component({
  selector: 'basic-curd-view-modal',
  templateUrl: './basic-curd-view-modal.component.html',
  styleUrls: ['./basic-curd-view-modal.component.less']
})
export class BasicCurdViewModalComponent implements OnInit {
  record: any = {};
  data: any;
  status = [
    { index: 0, text: '关闭', value: false, type: 'default', checked: false },
    {
      index: 1,
      text: '运行中',
      value: false,
      type: 'processing',
      checked: false,
    },
    { index: 2, text: '已上线', value: false, type: 'success', checked: false },
    { index: 3, text: '异常', value: false, type: 'error', checked: false },
  ];
  styleIndex = 0;
  dlLayout = 'horizontal';
  dlCol = 3;

  styleChanging = false;
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
  ) { }

  ngOnInit() {
    this.http
      .get('/rule/byKey', { key: this.record.key })
      .pipe(
        map((res: any) => {
          const statusItem = this.status[res.status];
          res.statusText = statusItem.text;
          res.statusType = statusItem.type;
          return res;
        }),
      )
      .subscribe(
        (res: any) => (this.data = res));
  }

  resetStyle() {
    switch (this.styleIndex) {
      case 0:
        this.setStyle0();
        break;
      case 1:
        this.setStyle1();
        break;
      case 2:
        this.setStyle2();
        break;
      default:
        this.setStyle0();
        break;
    }
  }
  selectStyleIndex(styleIndex: number) {


    this.styleIndex = styleIndex;

    console.log('selectStyleIndex:', this.styleIndex);

    this.styleChanging = true;
    this.resetStyle();
    setTimeout(() => {
      this.styleChanging = false;
    }, 0);
  }

  setStyle0(): void {
    this.dlLayout = 'horizontal';
    this.dlCol = 3;
  }
  setStyle1(): void {
    this.dlLayout = 'vertical';
    this.dlCol = 2;
  }
  setStyle2(): void {
    this.dlLayout = 'horizontal';
    this.dlCol = 1;
  }
}
