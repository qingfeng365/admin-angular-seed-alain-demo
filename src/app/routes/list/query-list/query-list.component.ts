import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SimpleTableData } from '@delon/abc';
import { map, tap } from 'rxjs/operators';
import { SortDef } from '../../../common-type';

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
    pi: 1,   // 当前页数 page index
    ps: 10,  // 每页记录数 page size
    sorter: '', // 排序字段
    status: null, // 当前所选状态 对象
    statusList: [],  // 可选状态列表
    updatedAt: [],
    sortDefIndex: 0,  // 当前所选排序对象
    lastSortDefIndex: 0, // 上一次所选排序对象
  };


  expandFormQueryBtnSpan = 8;

  data: any[] = []; // 列表数据
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
  /**
   * Creates an instance of QueryListComponent.
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
    this.getData();
  }
  selectSort() {
    if (this.q.sortDefIndex === this.q.lastSortDefIndex) {
      // 是点击相同的排序
      if (this.sortList[this.q.sortDefIndex].isCanSelectOrderMode) {
        // 切换方向
        this.sortList[this.q.sortDefIndex].isDesc = !this.sortList[this.q.sortDefIndex].isDesc;
      }
    } else {
      // 是点击不同的排序, 重置 isDesc
      this.sortList[this.q.sortDefIndex].isDesc = false;
    }
    this.q.lastSortDefIndex = this.q.sortDefIndex;
  }
  getData() {
    this.loading = true;

    /** 原示例还提供在表格列标题中提供筛选功能,
     * 考虑到该功能会让前后端的处理代码变得复杂,
     * 目前不考虑设置表格列筛选功能,
     * 由于 mock 的筛选功能是查询 statusList,
     * 所以传参仍在 statusList 中处理
     */
    if (this.q.status !== null && this.q.status > -1) {
      this.q.statusList = [this.q.status];
    } else {
      this.q.statusList = [];
    }


    /** 原示例代码 */
    // this.q.statusList = this.status
    //   .filter(w => w.checked)
    //   .map(item => item.index);
    // if (this.q.status !== null && this.q.status > -1)
    //   this.q.statusList.push(this.q.status);


    this.http
      .get('/rule', this.q)
      // Rxjs 6 不再采用多个操作符链接模式,
      // 需要用 pipe 方法, 将多个操作符作为参数,
      // pipe 作用等同于将 多个操作符 依次传递执行
      .pipe(
        map((list: any[]) =>
          // 返回的是数组, 在 mock 数据中, status 是 index
          // 需要再处理,
          list.map(i => {
            const statusItem = this.status[i.status];
            i.statusText = statusItem.text;
            i.statusType = statusItem.type;
            return i;
          }),
        ),
        // tap 跟 do 是一样的
        // tap(名词) 表示 窃听, 录音, 语义上更明确
        tap(() => (this.loading = false)),
    )
      .subscribe(res => {
        this.data = res;
        console.log('this.data:', this.data);
      });
  }

}
