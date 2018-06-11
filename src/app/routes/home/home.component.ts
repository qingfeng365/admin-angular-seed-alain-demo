import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ReuseTabService } from '@delon/abc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(private http: _HttpClient,
    private reuseTabService: ReuseTabService) {
    this.reuseTabService.closable = false;
  }

  ngOnInit() { }
}
