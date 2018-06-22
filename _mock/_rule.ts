import { HttpRequest } from '@angular/common/http';
import { MockRequest } from '@delon/mock';

const list = [];

for (let i = 0; i < 46; i += 1) {
  list.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    no: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    description: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

function getRule(params: any) {
  console.log('getRule:', params);
  let ret = [...list];
  if (params.sorter) {
    const s = params.sorter.split('_');
    ret = ret.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }
  if (params.statusList) {
    params.statusList = params.statusList.toString();

    if (params.statusList && params.statusList.length > 0) {
      console.log('params.statusList:', params.statusList);
      ret = ret.filter(data => params.statusList.indexOf(data.status) > -1);
    }
  }
  if (params.no) {
    ret = ret.filter(data => data.no.indexOf(params.no) > -1);
  }

  let beginPos = 0;
  let endPos = ret.length;

  // pi 当前页数, 是从 1 开始的
  if (params.pi) {
    beginPos = (params.pi - 1) * (params.ps || 10);
    endPos = params.pi * (params.ps || 10);
  }


  return {
    total: ret.length,
    datas: ret.slice(beginPos, endPos)
  };
}

function getRuleForExport(params: any) {
  let ret = [...list];
  if (params.sorter) {
    const s = params.sorter.split('_');
    ret = ret.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }
  if (params.statusList) {
    params.statusList = params.statusList.toString();

    if (params.statusList && params.statusList.length > 0) {
      console.log('params.statusList:', params.statusList);
      ret = ret.filter(data => params.statusList.indexOf(data.status) > -1);
    }
  }
  if (params.no) {
    ret = ret.filter(data => data.no.indexOf(params.no) > -1);
  }

  const beginPos = 0;
  const endPos = ret.length;
  return {
    datas: ret.slice(beginPos, endPos)
  };
}

function getRouleByKey(key: number) {
  const ret = [...list];
  // tslint:disable-next-line:triple-equals
  return ret.find(item => item.key == key);
}

function getRuleAll(params: any) {
  console.log('getRuleAll:', params);
  const ret = [...list];
  return {
    total: ret.length,
    datas: ret,
  };
}

function removeRule(nos: string): boolean {
  nos.split(',').forEach(no => {
    const idx = list.findIndex(w => w.no === no);
    if (idx !== -1) list.splice(idx, 1);
  });
  return true;
}

function addRule(description: string) {
  const i = Math.ceil(Math.random() * 10000);
  list.unshift({
    key: i,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    no: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    description: description || '',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 2,
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: Math.ceil(Math.random() * 100),
  });
}

function saveRule(body: any) {
  const i = Math.ceil(Math.random() * 10000);
  const data = {
    key: body.hasOwnProperty('key') ? body.key : i,
    href: body.href || 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    no: body.no || `TradeCode ${i}`,
    title: body.title || `一个任务名称 ${i}`,
    owner: body.owner || '',
    description: body.description || '',
    callNo: body.hasOwnProperty('callNo') ? body.callNo : Math.floor(Math.random() * 1000),
    status: body.hasOwnProperty('status') ? body.status : Math.floor(Math.random() * 10) % 2,
    updatedAt: new Date(),
    createdAt: new Date(),
    progress: body.hasOwnProperty('progress') ? body.progress : Math.ceil(Math.random() * 100),
  };

  if (body.hasOwnProperty('key')) {
    const updateIndex = list.findIndex(item => item.key === body.key);
    if (updateIndex !== -1) {
      list[updateIndex] = data;
    } else {
      list.unshift(data);
    }
  } else {
    // 插入到最前面
    list.unshift(data);
  }
  return data;
}



export const RULES = {
  '/rule': (req: MockRequest) => getRule(req.queryString),
  '/rule/byKey': (req: MockRequest) => getRouleByKey(req.queryString.key),
  '/rule/all': (req: MockRequest) => getRuleForExport(req.queryString),
  'DELETE /rule': (req: MockRequest) => removeRule(req.queryString.nos),
  'POST /rule': (req: MockRequest) => addRule(req.body.description),
  'POST /rule/update': (req: MockRequest) => saveRule(req.body),
};
