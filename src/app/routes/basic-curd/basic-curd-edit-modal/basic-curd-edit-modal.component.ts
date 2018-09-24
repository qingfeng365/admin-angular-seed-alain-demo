import { Component, OnInit, ViewChild } from '@angular/core';
import { SFSchema, SFUISchema, SFComponent } from '@delon/form';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import * as _ from 'lodash';

@Component({
  selector: 'basic-curd-edit-modal',
  templateUrl: './basic-curd-edit-modal.component.html',
  styleUrls: ['./basic-curd-edit-modal.component.less']
})
export class BasicCurdEditModalComponent implements OnInit {

  /** 接收外部传参的变量, 推荐使用名称: record , 因 SimpleTable 的按钮
   * 默认是将参数传到 record 变量, 如果要使用其它名称, 需要额外指定接收参数名
   */
  record: any = {};
  /** 是新增状态 */
  isInNewState = true;
  data: any;
  statuList = [
    { value: 0, label: '关闭' },
    { value: 1, label: '运行中' },
    { value: 2, label: '已上线' },
    { value: 3, label: '异常' },
  ];
  schema: SFSchema;

  ui: SFUISchema;

  @ViewChild('sf')
  sf: SFComponent;

  styleIndex = 0;
  sfLayout = 'horizontal';
  styleChanging = false;
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
  ) { }

  ngOnInit() {

    /** 判断是否新增的第一种方式: 存在 key 即为修改状态  */
    // this.isInNewState = !_.isNumber(this.record.key);

    /** 判断是否新增的第二种方式: 通过传入的参数 isNew 判断  */
    this.isInNewState = this.record.isNew;

    this.reloadSchema();
    if (this.isInNewState) {
      this.data = {};
    } else {
      this.http
        .get('/rule/byKey', { key: this.record.key })
        .subscribe(
          (res: any) => (this.data = {
            key: res.key,
            no: res.no,
            owner: res.owner,
            status: res.status,
            callNo: res.callNo,
            progress: res.progress,
            href: res.href,
            description: res.description
          }));
    }
  }
  reloadSchema() {
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
    this.styleChanging = true;
    this.reloadSchema();
    setTimeout(() => {
      this.styleChanging = false;
    });
  }
  setStyle0(): void {
    this.sfLayout = 'horizontal';
    this.schema = {
      properties: {
        no: { type: 'string', title: '编号' },
        owner: { type: 'string', title: '姓名', maxLength: 15 },
        status: {
          type: 'string', title: '状态', enum: [...this.statuList],
          default: this.statuList[0].value,
        },
        callNo: {
          type: 'integer', title: '调用次数', minimum: 0,
          default: 0,
        },
        progress: {
          type: 'number', title: '进度', minimum: 0, maximum: 100,
          default: 0
        },
        href: { type: 'string', title: '链接', format: 'uri' },
        description: { type: 'string', title: '描述', maxLength: 140 },
      },
      required: ['owner', 'callNo', 'href', 'status'],
    };

    this.ui = {
      '*': {
        // spanLabelFixed: 100,
        // spanLabel: 5,
        // offsetControl: 1,
        // spanControl: 18,
        debug: true,
        grid: {
          span: 12,
          gutter: 8,
        },
      },
      $no: {
        widget: this.isInNewState ? 'string' : 'text',
      },
      $owner: {
        placeholder: '请输入姓名',
      },
      $callNo: {
        addOnAfter: '万',
      },
      $progress: {
        widget: 'number',
        parser: value => value.replace(' %', ''),
        formatter: value => `${value} %`,
      },
      $href: {
        widget: 'string',
      },
      $description: {
        widget: 'textarea',
        spanLabel: 3,
        spanControl: 21,
        grid: { span: 24 },
      },
    };
  }
  setStyle1(): void {
    this.sfLayout = 'vertical';
    this.schema = {
      properties: {
        no: { type: 'string', title: '编号' },
        owner: { type: 'string', title: '姓名', maxLength: 15 },
        status: {
          type: 'string', title: '状态', enum: [...this.statuList],
          default: this.statuList[0].value,
          description: '状态说明文字',
        },
        callNo: {
          type: 'integer', title: '调用次数', minimum: 0,
          default: 0,
          description: '调用次数, 单位: 万',
        },
        progress: {
          type: 'number', title: '进度', minimum: 0, maximum: 100,
          default: 0
        },
        href: { type: 'string', title: '链接', format: 'uri' },
        description: { type: 'string', title: '描述', maxLength: 140 },
      },
      required: ['owner', 'callNo', 'href', 'status'],
    };

    this.ui = {
      '*': {
        debug: true,
        grid: {
          gutter: 32,
          md: {
            span: 12,
          },
          xs: {
            span: 24,
          },

        },
      },
      $no: {
        widget: this.isInNewState ? 'string' : 'text',
      },
      $owner: {
        placeholder: '请输入姓名',
        optionalHelp: 'test optionalHelp',
        optional: '可选',
      },
      $callNo: {
        addOnAfter: '万',
      },
      $progress: {
        widget: 'number',
        parser: value => value.replace(' %', ''),
        formatter: value => `${value} %`,
      },
      $href: {
        widget: 'string',
      },
      $description: {
        widget: 'textarea',
        grid: { span: 24 },
      },
    };
  }
  setStyle2(): void {
    this.sfLayout = 'horizontal';
    this.schema = {
      properties: {
        no: { type: 'string', title: '编号' },
        owner: { type: 'string', title: '姓名', maxLength: 15 },
        status: {
          type: 'string', title: '状态', enum: [...this.statuList],
          default: this.statuList[0].value,
          description: '状态说明文字',
        },
        callNo: {
          type: 'integer', title: '调用次数', minimum: 0,
          default: 0,
          description: '调用次数, 单位: 万',
        },
        progress: {
          type: 'number', title: '进度', minimum: 0, maximum: 100,
          default: 0
        },
        href: { type: 'string', title: '链接', format: 'uri' },
        description: { type: 'string', title: '描述', maxLength: 140 },
      },
      required: ['owner', 'callNo', 'href', 'status'],
    };

    this.ui = {
      '*': {
        debug: true,
        // spanLabel 默认为 5
        // spanControl 默认为 19
      },
      $no: {
        widget: this.isInNewState ? 'string' : 'text',
      },
      $owner: {
        placeholder: '请输入姓名',
        optionalHelp: 'test optionalHelp',
        optional: '可选',
      },
      $callNo: {
        addOnAfter: '万',
      },
      $progress: {
        widget: 'number',
        parser: value => value.replace(' %', ''),
        formatter: value => `${value} %`,
      },
      $href: {
        widget: 'string',
      },
      $description: {
        widget: 'textarea',
        grid: { span: 24 },
      },
    };
  }
  save(value: any) {

    console.log('save: ', value);
    this.modal.close(value);



  }
  close() {
    this.modal.destroy();
  }

}
