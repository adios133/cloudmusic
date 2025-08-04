import request from "@/utils/request";

// 封装获取轮播图数据请求
export function getSwiper(type = 2): AxiosResponseFormat<any> {
  return request({
    url: "/banner",
    params: {
      type
    }
  });
}

// 封装请求推荐歌单数据
export function getRecommend(limit = 12): AxiosResponseFormat<any> {
  return request({
    url: "/personalized",
    params: {
      limit
    }
  });
}

// 封装获取简洁榜单数据请求
export function getRankList(): AxiosResponseFormat<any> {
  return request({
    url: "/toplist"
  });
}

// 封装获取歌单详情
export function getListDetail(id: string): AxiosResponseFormat<any> {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  });
}

// 数据整合
export class HomeRankItem {
  public title: string;
  public id: string;
  public songList: any[];
  constructor(playlist: any, tracks: any[]) {
    this.title = playlist.name;
    this.id = playlist.id;
    this.songList = tracks;
  }
}

// 搜索默认关键字
export function getDefault(): AxiosResponseFormat<any> {
  return request({
    url: "/search/default"
  });
}

// 签到
export function getSignIn(type = 1): AxiosResponseFormat<any> {
  return request({
    url: "/daily_signin",
    params: {
      type
    }
  });
}
export function logOut(): AxiosResponseFormat<any> {
  const timestamp = +new Date();
  return request({
    url: "/logout?timestamp=" + timestamp
  });
}
