import { Injectable, Injector, Inject } from '@angular/core';

@Injectable()
export class ApiService {

  /**
   * 后端服务器基本网址:　http://域名:端口号/
   *
   * 未尾应有 /
   * @memberof ApiService
   */
  private apiServerBaseUrl = '';
  constructor() {

  }

  /**
   * 设置后端服务器基本网址
   *
   * @param {string} apiServerBaseUrl
   * @memberof ApiService
   */
  setBaseUrl(apiServerBaseUrl: string): void {
    if (!apiServerBaseUrl.endsWith('/')) {
      apiServerBaseUrl = apiServerBaseUrl + '/';
    }
    this.apiServerBaseUrl = apiServerBaseUrl;
  }

  /**
   * 返回完整网址
   *
   * @param {string} apiUrl api相对网址, 前面不要加 /
   * @returns {string}
   * @memberof ApiService
   */
  getFullUrl(apiUrl: string): string {
    if (apiUrl.startsWith('/')) {
      apiUrl = apiUrl.slice(1);
    }
    const result = `${this.apiServerBaseUrl}${apiUrl}`;
    return result;
  }

}
