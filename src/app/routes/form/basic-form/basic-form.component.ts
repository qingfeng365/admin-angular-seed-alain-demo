import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ReuseTabService } from '@delon/abc';
import { Router } from '@angular/router';
@Component({
  selector: 'basic-form',
  templateUrl: './basic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./basic-form.component.less']
})
export class BasicFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  currUrl: string;
  constructor(private fb: FormBuilder, private msg: NzMessageService, private cdr: ChangeDetectorRef,

    private reuseTabService: ReuseTabService,
    router: Router) {
    this.currUrl = router.url;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      goal: [null, [Validators.required]],
      standard: [null, [Validators.required]],
      client: [null, []],
      invites: [null, []],
      weight: [null, []],
      public: [1, [Validators.min(1), Validators.max(3)]],
      publicUsers: [null, []],
    });
  }
  submit() {
    for (const i in this.form.controls) {
      // 将所有元素标记为脏状态, 重新检查, 用于显示所有必填项错误
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) return;

    // 控制 提交 按钮的 loading 状态
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.msg.success(`提交成功`);
      this.cdr.detectChanges();
      setTimeout(() => {
        this.close();
      }, 1000);
    }, 1000);
  }

  close() {
    this.reuseTabService.close(this.currUrl);
  }
}
