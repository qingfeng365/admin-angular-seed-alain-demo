import { Component, OnInit, ViewChild } from '@angular/core';
import { SortDef } from 'app/common-type';
import { SimpleTableData, SimpleTableComponent, SimpleTableColumn } from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { BasicCurdEditModalComponent } from '../basic-curd-edit-modal/basic-curd-edit-modal.component';
import { BasicCurdViewModalComponent } from '../basic-curd-view-modal/basic-curd-view-modal.component';

@Component({
  selector: 'basic-curd-list',
  templateUrl: './basic-curd-list.component.html',
  styleUrls: ['./basic-curd-list.component.less']
})
export class BasicCurdListComponent implements OnInit {
  /** 排序面板定义 */
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

  /** 条件面板及排序工具栏对应的变量(ngModel) */
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

  /** 条件面板展开模式下的查询按钮所占空间 */
  expandFormQueryBtnSpan = 8;

  /** 状态名称列表, 用于将模拟数据中的状态数值转换成字符 */
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

  /** 条件面板是处于展开状态 */
  expandForm = false;

  /** 列表数据 */
  data: any[] = [];
  /** 表格是否处于 loading */
  loading = false;
  /** 当前用户选择的数据行 */
  selectedRows: SimpleTableData[] = [];

  /** 表格模板变量 */
  @ViewChild('st') st: SimpleTableComponent;

  /** 表格数据总量, 用于表格计算分页显示*/
  stRecordTotal: number;
  /** 表格每页数据, 用于表格计算分页显示*/
  stPageSize = 10;

  /** 表格当前页序号(从1开始), 用于表格计算分页显示*/
  stPageCurrNumber = 0;

  /** 表格列定义
   *
   * index 对应字段名, 但支持嵌套写法, 如 a.b.c
   *
   * type 默认为 string
   *
   * checkbox 多选;
   *
   * radio 单选；
   *
   * link 链接，可触发 click；
   *
   * img 图像且居中；
   *
   * number 数字且居右；
   *
   * currency 货币且居右；
   *
   * date 日期格式且居中；
   *
   * yn 将boolean类型徽章化
   *
   */
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
      // 这里设置为 status 或 statusText ,对于页面显示都可以
      // 因为实际显示由模板决定, 模板实际上是用 statusText 显示,
      // 但是对于输出就不同, 输出只会输出对应字段名的数据
      // index: 'status',
      index: 'statusText',
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
          type: 'modal',
          component: BasicCurdViewModalComponent,
          params: (record: any) => {
            return { key: record.key };
          },
        },
        {
          text: '编辑',
          type: 'static',
          component: BasicCurdEditModalComponent,
          params: (record: any) => {
            return { key: record.key };
          },
          click: (record: any, modalResult: any) => {
            this.http
              .post('/rule/update', modalResult)
              .subscribe(res => {
                this.msg.success(`编辑成功`);
                this.st.reload();
              });

          },
        },
      ],
    },
  ];

  /**
   *
   * @param {_HttpClient} http
   * @param {NzMessageService} msg 全局信息提示 https://ng.ant.design/components/message/zh
   * @param {ModalHelper} modalHelper 使用 modalHelper 比 NzModalService 更好一点
   * @memberof QueryListComponent
   */
  constructor(private http: _HttpClient,
    public msg: NzMessageService,
    private modalHelper: ModalHelper, ) { }

  ngOnInit() {
    this.getData();
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
        // 原示例代码 是使用前端分页
        // map((list: any[]) =>
        //   // 返回的是数组, 在 mock 数据中, status 是 index
        //   // 需要再处理,
        //   list.map(i => {
        //     const statusItem = this.status[i.status];
        //     i.statusText = statusItem.text;
        //     i.statusType = statusItem.type;
        //     return i;
        //   }),
        // ),

        // 现改为后端分页
        map((res: { total: number, datas: any[] }) => {
          const newDatas = res.datas.map(i => {
            const statusItem = this.status[i.status];
            i.statusText = statusItem.text;
            i.statusType = statusItem.type;
            return i;
          });

          return { total: res.total, datas: newDatas };
        }),


        // tap 跟 do 是一样的
        // tap(名词) 表示 窃听, 录音, 语义上更明确
        tap(() => (this.loading = false)),
    )
      .subscribe(res => {
        this.stRecordTotal = res.total;
        this.stPageCurrNumber = res.datas.length === 0 ? 0 : this.q.pi;
        this.data = res.datas;
      });
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
    this.q.pi = event.pi;
    this.q.ps = event.ps;
    this.getData();
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

  exportToExcel() {
    // filename 可以不指定, 默认为 export.xlsx

    const dataUrl = '/rule/all';
    this.http
      .get(dataUrl, this.q)
      .pipe(
        map((res: { total: number, datas: any[] }) => {
          const newDatas = res.datas.map(i => {
            const statusItem = this.status[i.status];
            i.statusText = statusItem.text;
            i.statusType = statusItem.type;
            return i;
          });

          return { datas: newDatas };
        }),
    )
      .subscribe(res => {
        this.st.export(res.datas, { filename: 'basic-curd-list.xlsx' });
      });

  }

  add() {
    // 调用静态对话框, 静态是指点击蒙层不会自动关闭
    // 要订阅后,才会调出对话框,
    // 使用 modalHelper , 只有对话框确定后, 才会得到订阅值
    this.modalHelper
      .static(
        BasicCurdEditModalComponent,
        {
          record: { isNew: true }
        }, )
      .subscribe(modalResult => {
        console.log('add data:', modalResult);
        this.http
          .post('/rule/update', modalResult)
          .subscribe(res => {
            this.msg.success(`新增成功`);
            this.st.reload();
          });
      });



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
    this.q.no = '';
    this.q.status = null;
    this.q.statusList = [];
    this.st.reload(this.q);
  }
}
