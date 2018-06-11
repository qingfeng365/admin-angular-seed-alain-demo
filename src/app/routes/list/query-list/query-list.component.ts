import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SimpleTableData, SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SortDef } from '../../../common-type';
import * as _ from 'lodash';

let self: QueryListComponent;

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.less'],
})
export class QueryListComponent implements OnInit {
  sortList: SortDef[] = [
    {
      title: '综合排序',
      name: 'default',
      isCanSelectOrderMode: false,
      isDesc: false,
    },
    {
      title: '规则编号',
      name: 'no',
      isCanSelectOrderMode: false,
      isDesc: false,
    },
    {
      title: '使用状态',
      name: 'status',
      isCanSelectOrderMode: false,
      isDesc: false,
    },
    {
      title: '调用次数',
      name: 'callNo',
      isCanSelectOrderMode: true,
      isDesc: false,
    },
    {
      title: '更新日期',
      name: 'updatedAt',
      isCanSelectOrderMode: true,
      isDesc: false,
    },
  ];
  q: any = {
    sorter: '', // 排序字段
    status: null, // 当前所选状态 index
    statusList: [],  // 可选状态[],原方案是为了可多选
    updatedAt: [],
    sortDefIndex: 0,  // 当前所选排序对象
    lastSortDefIndex: 0, // 上一次所选排序对象
  };

  expandFormQueryBtnSpan = 8;

  dataUrl = '/rule';
  loading = false;  // 表格是否处于 loading

  // 可选状态列表
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

  // 条件面板是处于展开状态
  expandForm = false;
  // 当前用户选择的数据行
  selectedRows: SimpleTableData[] = [];

  @ViewChild('st') st: SimpleTableComponent;

  stRecordTotal: number;
  stPageSize = 10;
  stPageCurrNumber = 0;

  // 表格列定义
  // index 对应字段名, 但支持嵌套写法, 如 a.b.c
  // type 默认为 string
  //   checkbox 多选；
  //   radio 单选；
  //   link 链接，可触发 click；
  //   img 图像且居中；
  //   number 数字且居右；
  //   currency 货币且居右；
  //   date 日期格式且居中；
  //   yn 将boolean类型徽章化
  columns: SimpleTableColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: '规则编号', index: 'no' },
    { title: '描述', index: 'description' },
    {
      title: '服务调用次数',
      index: 'callNo',
      type: 'number',
      format: (item: any) => `${item.callNo} 万`,
    },
    {
      title: '状态',
      index: 'status',
      render: 'status', // 对应 ng-template(st-row="status")
    },
    {
      title: '更新时间',
      index: 'updatedAt',
      type: 'date',
    },
    {
      title: '操作',
      buttons: [
        {
          text: '详情',
          click: (item: any) => this.msg.success(`详情${item.no}`),
        },
        {
          text: '编辑',
          click: (item: any) => this.msg.success(`编辑${item.no}`),
        },
      ],
    },
  ];

  /**
   *
   * @param {_HttpClient} http
   * @param {NzMessageService} msg 全局信息提示 https://ng.ant.design/components/message/zh
   * @param {NzModalService} modalSrv
   * @memberof QueryListComponent
   */
  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
  ) { }
  ngOnInit() {
    self = this;
  }
  selectSort() {
    let isReLoad = true;
    if (this.q.sortDefIndex === this.q.lastSortDefIndex) {
      // 是点击相同的排序
      if (this.sortList[this.q.sortDefIndex].isCanSelectOrderMode) {
        // 切换方向
        this.sortList[this.q.sortDefIndex].isDesc = !this.sortList[this.q.sortDefIndex].isDesc;
      } else {
        // 点击与上一次相同的排序,且没有提供切换方向功能时,不需要重新加载
        isReLoad = false;
      }
    } else {
      // 是点击不同的排序, 重置 isDesc
      this.sortList[this.q.sortDefIndex].isDesc = false;
    }
    this.q.lastSortDefIndex = this.q.sortDefIndex;
    if (isReLoad) {
      // 以下代码要根据后端 api 的设定为准, 当前是 mock 代码
      if (this.sortList[this.q.sortDefIndex].name === 'default') {
        this.q.sorter = '';
      } else {
        let mode = '';
        if (this.sortList[this.q.sortDefIndex].isCanSelectOrderMode &&
          this.sortList[this.q.sortDefIndex].isDesc) {
          mode = 'descend';
        }
        this.q.sorter = `${this.sortList[this.q.sortDefIndex].name}_${mode}`;
      }
      this.st.reload(this.q);
    }
  }
  search() {
    this.clearSelected();
    if (this.q.status !== null) {
      this.q.statusList = [this.q.status];
    } else {
      this.q.statusList = [];
    }
    this.st.reload(this.q);
  }
  reset() {
    this.clearSelected();
    this.q.statusList = [];
    this.st.reload(this.q);
  }
  // 采用 url 模式时,如果需要预处理
  preDataChange(data: SimpleTableData[]) {
    const status = self.status;
    return data.map(i => {
      const statusItem = status[i.status];
      i.statusText = statusItem.text;
      i.statusType = statusItem.type;
      return i;
    });
  }

  clearSelected() {
    this.selectedRows = [];
    this.st.clearCheck();
  }
  checkboxChange(list: SimpleTableData[]) {
    // checkboxChange 的 参数 list, 仅为当前页面的 选择列表
    this.selectedRows = _.uniqBy(_.concat(this.selectedRows, list), 'key');

    console.log('selectedRows:', this.selectedRows);


  }

  change(event) {
    console.log('change:', event);
  }

  exportToExcel() {
    // 这里要获取全部数据,要重新指定获取全部数据的url
    // 因 export 不能指定附加参数, 而表格的要求的 url 不能带查询参数,
    // 只能是纯 url, 因此最好另外指定 新的 url
    // 用 表格 组件的方法, 好处 是 不需要处理标题行
    // 如果 输入时对数据列有隐藏, 内容格式等额外需求时, 则
    // 不要用 url 方式, 改用 data[] 模式, 自行处理 data[]后输出
    // filename 可以不指定, 默认为 export.xlsx

    const dataUrl = '/rule/all';
    // 注意: preDataChange 在这里是不会执行的, 因此
    // 建议尽量少用 preDataChange, 应在后端将数据处理好
    this.st.export(dataUrl, { filename: 'query-list.xlsx' });

  }

  remove() {
    this.http
      .delete('/rule',
        { nos: this.selectedRows.map(i => i.no).join(',') })
      .subscribe(() => {
        this.clearSelected();
        this.st.reload(this.q);
      });
  }

  approval() {
    this.msg.success(`审批了 ${this.selectedRows.length} 笔`);
  }
}
